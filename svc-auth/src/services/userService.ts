import { User } from 'src/models';
import { getLogger } from 'src/libs/logger';
import { RegisterParamsInterface } from 'src/routes/register/RegisterParamsFromReq';
import { passwordService } from './passwordService';

class UserService {
  private logger = getLogger('UserService');

  public findUserByEmail (email: string) {
    return User.findOne({ email });
  }

  public async createUser (params: RegisterParamsInterface) {
    const data = { ...params };
    delete data.passwordConfirmation;
    data.passwordHash = await passwordService.generateHash(data.password);

    return User.create(data);
  }
}
export const userService = new UserService();
