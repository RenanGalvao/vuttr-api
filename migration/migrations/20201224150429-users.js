const bcrypt = require('bcrypt');

module.exports = {
  async up(db, client) {
    await db.collection('users').insertOne({
      name: 'Admin',
      email: 'admin@dev.com',
      password: await bcrypt.hash('admin', 10),
    });
  },

  async down(db, client) {
    await db.collection('users').drop();
  }
};
