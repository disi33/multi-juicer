const { get } = require('./config');
const { logger } = require('./logger');

var app = require('./app.js');

const basePath = get("basePath");
if(basePath !== '')
{
  var express = require('express'),
      newApp = express();

  newApp.use(basePath, app);

  app = newApp;
}

const server = app.listen(get('port'), () =>
  logger.info(`JuiceBalancer listening on port ${get('port')}!`)
);

process.on('SIGTERM', () => {
  logger.warn('Recieved "SIGTERM" Signal shutting down.');
  server.close();
  process.exit(0);
});
