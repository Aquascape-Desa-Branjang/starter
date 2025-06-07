const bcrypt = require('bcryptjs');

module.exports = async () => {
    const User = require("../models/user");
    const userSeeder = { username: 'ktp', password: '07061945' };

    await User.findOrCreate({
      where: { username: userSeeder.username },
      defaults: { password: await bcrypt.hash(userSeeder.password, 10)}
    });
};