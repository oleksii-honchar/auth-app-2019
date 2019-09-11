import { isEmpty } from 'lodash';

import { getLogger } from '@src/libs/logger';

class DbSeedService {
  private logger = getLogger('DbSeedService');

  public async bootstrapDb(): Promise<void> {
    this.logger.info('bootstrapDb() start');

    this.logger.info('bootstrapDb() finish');
  }
}

export const dbSeedService = new DbSeedService();
