const appConfig = require('../src/configs/main.js');
const databaseConfig = require('../src/configs/database.js');

const config = {
  mongodb: {
    url: appConfig.mongoURL,
    databaseName: "",
    options: databaseConfig
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: "migrations",

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: "changelog",

  // The file extension to create migrations and search for in migration dir 
  migrationFileExtension: ".js"
};

// Return the config as a promise
module.exports = config;
