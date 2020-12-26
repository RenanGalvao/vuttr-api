const { config, database, status, up, down } = require('migrate-mongo');

(async () => {
  // Set config
  config.set(require('../../migration/migrate-mongo-config.js'));

  // Connect to database
  const { db, client } = await database.connect();

  // Put down
  const migrationStatus = await status(db);
  for(let i = 0; i < migrationStatus.length; i++){
    await down(db, client);
    console.log('Migrated Down: ', migrationStatus[i].fileName);
  }

  // Then up
  const migrated = await up(db, client);
  migrated.forEach(fileName => console.log('Migrated Up:', fileName));

  db.close();
})();