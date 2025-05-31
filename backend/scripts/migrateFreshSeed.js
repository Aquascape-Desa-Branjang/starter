const sequelize = require('../config/db');
const fs = require('fs');
const path = require('path');

async function migrateFreshSeed() {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database.');

    const modelsDir = path.join(__dirname, '../models');
    const modelFiles = fs.readdirSync(modelsDir).filter(file => file.endsWith('.js'));

    for (const file of modelFiles) {
      require(path.join(modelsDir, file));
      console.log("Dropping and recreating: " + file);
    }

    await sequelize.sync({ force: true });
    console.log('All tables dropped and recreated.');

    const seedersDir = path.join(__dirname, '../seeders');
    const seederFiles = fs.readdirSync(seedersDir).filter(file => file.endsWith('.js'));

    for (const file of seederFiles) {
      const seeder = require(path.join(seedersDir, file));
      console.log(`Running seeder: ${file}`);
      await seeder();
    }

    console.log('Done resetting and seeding database.');
    process.exit(0);
  } catch (error) {
    console.error('Error resetting the database:', error);
    process.exit(1);
  }
}

migrateFreshSeed();
