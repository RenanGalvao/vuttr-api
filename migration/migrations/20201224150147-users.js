const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;
const id = ObjectId();

module.exports = {
  async up(db, client) {
    await db.collection('users').insertOne({
      _id: id,
      name: 'Admin',
      email: 'admin@dev.com',
      password: await bcrypt.hash('admin', 10),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(), 
    });
    await db.collection('users').createIndex({name: 'text', email: 'text'});
  },

  async down(db, client) {
    await db.collection('users').drop();
  },

  id: id,
};