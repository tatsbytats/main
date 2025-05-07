const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');

async function createAdmins() {
  const admins = [
    { username: 'admin1', password: 'Admin1Pass!' },
    { username: 'admin2', password: 'Admin2Pass!' },
    { username: 'admin3', password: 'Admin3Pass!' }
  ];

  for (const admin of admins) {
    const exists = await User.findOne({ username: admin.username });
    if (!exists) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      const newUser = new User({ ...admin, password: hashedPassword });
      await newUser.save();
      console.log(`Created ${admin.username}`);
    } else {
      console.log(`${admin.username} already exists`);
    }
  }
}

module.exports = createAdmins;
