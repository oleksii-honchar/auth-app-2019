import * as mongoose from 'mongoose';

import { UserRoles } from 'src/enums';
import { passwordService } from 'src/services';

const { ObjectId } = mongoose.Types;

class UserSeeds {
  private usersData: object[];
  private readonly commonPassword: string;

  constructor () {
    this.commonPassword = 'qwerty';

    this.usersData = [
      {
        _id: ObjectId('000000000001'),
        email: 'adam.weber@gmail.com',
        firstName: 'Adam',
        lastName: 'Weber',
        isEmailVerified: true,
        passwordHash: '',
        role: UserRoles.admin
      },
      {
        _id: ObjectId('000000000002'),
        email: 'emilia.stanton@gmail.com',
        firstName: 'Emilia',
        lastName: 'Stanton',
        isEmailVerified: true,
        passwordHash: '',
        role: UserRoles.admin
      }
    ];
  }

  public async getData (): Promise<object[]> {
    const passwordHash = await passwordService.generateHash(this.commonPassword)

    this.usersData = this.usersData.map((userData) => {
      userData['passwordHash'] = passwordHash;
      return userData;
    });

    return this.usersData;
  }
}


export const userSeeds = new UserSeeds();
