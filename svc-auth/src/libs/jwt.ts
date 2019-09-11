import * as jwt from 'jsonwebtoken';

const secretKey = '1234567890';

export function verify(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error: jwt.VerifyErrors) => {
      if (error) {
        return reject(error);
      }

      resolve();
    });
  });
}
