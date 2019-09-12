import http from 'http';
import tooBusy from 'toobusy-js';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { router } from './routes';
import { getLogger } from './libs/logger';
import { dbService, dbSeedService } from './services';
import { errorResponder, finalResponder } from './libs/responders';
import { noCacheMiddleware, tooBusyMiddleware, requestLoggerMiddleware } from './libs/middlewares';

import package$ from 'package.json';

process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'error';

const logger = getLogger('APP-SVC', { ignoreLogLevel: true });
const port = process.env.SVC_PORT || 4000;

logger.info(`[ENV_NAME = ${process.env.ENV_NAME}]`);
logger.info(`[LOG_LEVEL = ${process.env.LOG_LEVEL}]`);
logger.info(`[NODE_ENV = ${process.env.NODE_ENV}]`);
logger.info(`[SVC_PORT = ${port}]`);
logger.info(`[SVC_MOUNT_POINT = ${process.env.SVC_MOUNT_POINT}]`);
logger.info(`[MONGO_DB = ${process.env.MONGO_DB}]`);
logger.info(`[WA_BASE_URL = ${process.env.WA_BASE_URL}]`);

logger.info(`Starting app [${package$.name}] ...`);

const app = express();

app.set('port', port);
app.set('x-powered-by', false);
app.set('query parser', 'extended');

app.use(tooBusyMiddleware);
app.use(cookieParser());
app.use(requestLoggerMiddleware);
app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(noCacheMiddleware);

app.use(router);

errorResponder.use(app);
app.use(finalResponder.router);

const server = http.createServer(app);

async function start() {
  await dbService.connect();
  await dbSeedService.bootstrapDb();

  server.listen(port);
  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    switch (error.code) {
      case 'EACCES':
        logger.error(`Port ${port} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(`Port ${port} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

  server.on('listening', () => {
    const address = server.address()!;
    const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`;
    logger.info(`Listening on ${bind}`);
  });

  server.on('close', () => {
    logger.info('Server stopped');
  });

  process.on('SIGINT', () => {
    tooBusy.shutdown();
    process.exit();
  });

  process.on('unhandledRejection', (reason, p) => {
    logger.warn('Unhandled Rejection at: Promise', p, 'reason:', reason);
  });
}

start();
