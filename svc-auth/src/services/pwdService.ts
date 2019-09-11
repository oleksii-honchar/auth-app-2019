import * as bcrypt from 'bcryptjs';

class PasswordService {
  public saltRounds: number;

  constructor(saltRounds: number) {
    this.saltRounds = saltRounds;
  }

  public generateHash(pwd: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(this.saltRounds, (err: Error, salt: string) => {
        if (err) return reject(err);

        bcrypt.hash(pwd, salt, (err, hash) => {
          if (err) return reject(err);
          resolve(hash);
        });
      });
    });
  }
}

export const pwdService = new PasswordService(10);
