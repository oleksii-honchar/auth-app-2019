import { Request } from 'express';
import joi from '@hapi/joi';

import { getLogger } from 'src/libs/logger';
import { is } from 'src/libs/is';

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
  private rawParams: any;
  private readonly logger: any;
  private readonly schema: any;

  constructor (req: Request) {
    this.logger = getLogger('RegisterParamsFromReq');
    this.req = req;

    let paramsSource = '';
    paramsSource = is.empty(this.req.body) ? paramsSource : 'body';
    paramsSource = is.empty(this.req.params) ? paramsSource : 'params';
    paramsSource = is.empty(this.req.query) ? paramsSource : 'query';

    this.logger.debug(`"${paramsSource}" used to get params`);

    if (is.empty(paramsSource)) {
      this.rawParams = {};
      this.logger.warn('req.body/query/params empty');
    } else {
      this.rawParams = this.req[paramsSource];
    }

    this.logger.debug('create schema...');
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

  public async validate (): Promise<RegisterParamsInterface> {
    const params = {
      email: this.rawParams.email,
      password: this.rawParams.password,
      passwordConfirmation: this.rawParams.passwordConfirmation,
      firstName: this.rawParams.firstName,
      lastName: this.rawParams.lastName,
    };

    this.logger.debug('validate params...');


    const { error, value } = await this.schema.validate(params);
    if (error) {
      throw error;
    }

    return value;
  }
}
