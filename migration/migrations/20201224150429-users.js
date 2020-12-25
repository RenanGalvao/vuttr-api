const bcrypt = require('bcrypt');

module.exports = {
  async up(db, client) {
    await db.collection('users').insertOne({
      name: 'Admin',
      email: 'admin@dev.com',
      password: await bcrypt.hash('admin', 10),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(), 
    });
  },

  async down(db, client) {
    await db.collection('users').drop();
  }
};
