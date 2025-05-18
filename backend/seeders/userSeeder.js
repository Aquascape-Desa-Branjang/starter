const bcrypt = require('bcryptjs');

module.exports = async (User) => {
  const userSeeder = { username: 'ktp', password: 'password' };

    await User.findOrCreate({
      where: { username: userSeeder.username },
      defaults: { password: await bcrypt.hash(userSeeder.password, 10)}
    });

  console.log('✅ User seeded (if not already present)');
};