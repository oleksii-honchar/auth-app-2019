import * as mongoose from 'mongoose';

import { getLogger } from 'src/libs/logger';
import { MONGOOSE_CONNECTED_STATE, MONGO_CONNECTION_PORT } from '../constants';

class DbService {
  private logger = getLogger('DbService');

  public get isConnected (): boolean {
    return mongoose.connection.readyState === MONGOOSE_CONNECTED_STATE;
  }

  public getDB (): mongoose.Connection {
    return mongoose.connection;
  }

  public async connect (): Promise<void> {
    this.logger.info('connect() start');

    const { MONGO_DB } = process.env;

    try {
      await mongoose.connect(`mongodb://mongo:${MONGO_CONNECTION_PORT}/${MONGO_DB}`, {
        autoReconnect: true,
        useNewUrlParser: true,
      });

      this.logger.info('Successfully connected to the MongoDB');
    } catch ({ message }) {
      this.logger.error('I failed opening the default mongoose connection');
      this.logger.error(`Reason: ${message}`);
      process.exit(1);
    }

    this.logger.info('connect() finish');
  }
}

export const dbService = new DbService();
