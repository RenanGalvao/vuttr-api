import app from './app';
import config from './configs/main';

// Avoids problems with supertest
// Starts server
app.listen(config.serverPort, () => {
  console.log(`Listening on ${config.serverPort} port`);
});