import { Request } from 'express';
import * as joi from '@hapi/joi';

export interface RegisterParamsInterface {
  email: string;
  password: string;
  passwordConfirmation: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
}

export class RegisterParamsFromReq {
  private req: Request;

  private schema: any;

  constructor (req: Request) {
    this.req = req;

    this.schema = joi.object().keys({
      email: joi.string().email({ minDomainSegments: 2 }).max(100).required(),
      password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
      passwordConfirmation: joi.string().valid(joi.ref('password')).required(),
      firstName: joi.string().alphanum().min(3).max(30)
        .required(),
      lastName: joi.string().alphanum().min(3).max(30)
        .required(),
    })
      .with('lastName', 'firstName');
  }

  public validate (): Promise<RegisterParamsInterface> {
    const params = {
      email: this.req.body.email,
      password: this.req.body.password,
      passwordConfirmation: this.req.body.passwordConfirmation,
      firstName: this.req.body.firstName,
      lastName: this.req.body.lastName,
    };

    return new Promise<RegisterParamsInterface>((resolve, reject) => {
      joi.validate(
        params,
        this.schema,
        ((err: Function, val: RegisterParamsInterface) => {
          if (err) return reject(err);
          resolve(val);
        }) as any,
      );
    });
  }
}
