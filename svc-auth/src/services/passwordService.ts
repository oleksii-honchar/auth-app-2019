import * as bcrypt from 'bcryptjs';

class PasswordService {
  public saltRounds: number;

  constructor (saltRounds: number) {
    this.saltRounds = saltRounds;
  }

  public generateHash (pwd: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(this.saltRounds, (err: Error, salt: string) => {
        if (err) return reject(err);

        return bcrypt.hash(pwd, salt, (err1, hash) => {
          if (err1) return reject(err1);

          return resolve(hash);
        });
      });
    });
  }
}

export const passwordService = new PasswordService(10);
