import jwt from 'jsonwebtoken';
import { Buffer } from 'safe-buffer';
import { createCipheriv, Binary, createDecipheriv } from 'crypto';

import { User } from 'src/models';
import { getLogger } from 'src/libs/logger';

/**
 * Generate & verify jwt token
 */
class JwtService {
  private logger = getLogger('jwtService');
  private readonly apiSecretKey: string;
  private readonly tokenTtl: number;
  private algorithm: string = 'aes-256-cbc';
  private readonly iv: string;

  constructor (apiSecretKey: string, tokenTtl: number) {
    this.apiSecretKey = apiSecretKey;
    this.iv = apiSecretKey.substr(0, 16);
    this.tokenTtl = tokenTtl;
  }

  public generate (user: User) {
    this.logger.debug('generate()');
    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          user,
        },
        this.apiSecretKey,
        {
          expiresIn: this.tokenTtl,
        },
        (err, token) => {
          if (err) return reject(err);

          this.logger.debug('generate():encrypt..');
          const encryptedToken = this.encrypt(token);
          this.logger.debug('generate():encrypted');
          return resolve(encryptedToken);
        },
      );
    });
  }

  public verify (encryptedJwtToken: string) {
    return new Promise<String>((resolve, reject) => {
      this.logger.debug('verify() will decrypt');
      const decrypted = this.decrypt(encryptedJwtToken);

      this.logger.debug('verify() decrypted. Now verify.');
      jwt.verify(
        decrypted,
        this.apiSecretKey,
        (error: jwt.VerifyErrors, decoded) => {
          if (error) {
            this.logger.warn('verify()', error);
            return reject(error);
          }

          this.logger.debug('verify() success', decoded);
          return resolve(decoded as string);
        },
      );
    });
  }

  private encrypt (payload: string) {
    const cipher = createCipheriv(this.algorithm, this.apiSecretKey, this.iv);
    const encrypted = cipher.update(payload);
    const res = Buffer.concat([
      encrypted as unknown as Buffer,
      cipher.final() as unknown as Buffer,
    ]);
    return res.toString('hex');
  }

  private decrypt (payload: string) {
    const encryptedText: Buffer = Buffer.from(payload, 'hex');
    const decipher = createDecipheriv(this.algorithm, this.apiSecretKey, this.iv);
    const decrypted = decipher.update(encryptedText as unknown as Binary);
    const res = Buffer.concat([
      decrypted as unknown as Buffer,
      decipher.final() as unknown as Buffer,
    ]);
    return res.toString();
  }
}

export const jwtService = new JwtService(
  process.env.API_SECRET_KEY as string,
  parseInt(process.env.JWT_TTL_SECONDS as string, 10),
);
