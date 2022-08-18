const app = require('./app');
const config = require('./config/config');
const Moralis = require('moralis/node');
const logger = require('./config/logger');

const serverUrl = config.serverUrl;
const appId = config.appId;
const masterKey = config.masterKey;

let server;
const moralisServer = async () => {
  await Moralis.start({ serverUrl, appId, masterKey }).then(() => {
    logger.info('Connected to Moralis server');
    logger.info(`Moralis connected version ${Moralis.CoreManager.get("VERSION")}`);
    app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  })
};


// run the server
moralisServer();


const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
