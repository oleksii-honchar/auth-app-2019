import { getLogger } from '@src/libs/logger';
import { userSeeds } from '@src/seeds/userSeeds';
import { User } from '@src/models';

class DbSeedService {
  private logger = getLogger('DbSeedService.bootstrapDb()');

  public async bootstrapDb (): Promise<void> {
    this.logger.info('start');
    this.logger.info('users seeds processing');
    const userData: object[] = await userSeeds.getData();
    try {
      await Promise.all(userData.map((userSeed) => User.collection.updateOne(
        { _id: userSeed['_id'] },
        { $set: userSeed },
        { upsert: true },
      )));
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
    this.logger.info('finish');
  }
}

export const dbSeedService = new DbSeedService();
