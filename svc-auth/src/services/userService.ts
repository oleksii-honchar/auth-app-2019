import { User } from '@src/models';
import { getLogger } from '@src/libs/logger';
import { RegisterParamsInterface } from '@src/routes/register/RegisterParamsFromReq';
import { pwdService } from '@src/services/pwdService';

class UserService {
  private logger = getLogger('UserService');

  public findUserByEmail(email: string) {
    return User.findOne({ email });
  }

  public async createUser(params: RegisterParamsInterface) {
    delete params.passwordConfirmation;
    params.passwordHash = await pwdService.generateHash(params.password);

    return User.create(params);
  }
}
export const userService = new UserService();
