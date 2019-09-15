import { User } from 'src/models';
import { getLogger } from 'src/libs/logger';
import { RegisterParamsInterface } from 'src/routes/register/RegisterParamsFromReq';
import { passwordService } from './passwordService';

class UserService {
  private logger: any;

  constructor () {
    this.logger = getLogger('UserService');
  }

  public findUserByEmail (email: string) {
    return User.findOne({ email });
  }

  public async createUser (params: RegisterParamsInterface) {
    this.logger.debug('create new user...');
    const data = { ...params };
    delete data.passwordConfirmation;

    this.logger.debug('generate hash for pwd...');
    data.passwordHash = await passwordService.generateHash(data.password);
    delete data.password;

    return User.create(data);
  }
}
export const userService = new UserService();
