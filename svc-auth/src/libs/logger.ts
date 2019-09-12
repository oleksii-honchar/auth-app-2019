import { Request, Response } from 'express';
import { pick, isEmpty, defaults, omit, extend, has, get, isObject } from 'lodash';
import Bunyan from 'bunyan';
import BanyanFormat from 'bunyan-format';

import { is } from './is';

import package$ from '../../package.json';

const loggers: { [key: string]: Bunyan } = {};

function reqSerializer(req: Request) {
  const headers = pick(req.headers, ['host', 'user-agent', 'x-real-ip']);

  const res: any = {
    headers,
    method: req.method,
    url: req.url
  };

  if (!isEmpty(req.query)) {
    res.query = req.query;
  }

  if (!isEmpty(req.params)) {
    res.params = req.params;
  }

  if (!isEmpty(req.body)) {
    res.body = req.body;
  }

  return res;
}

function resSerializer(res: Response) {
  const headers = pick(res._headers, ['content-length', 'content-type']);

  return {
    headers,
    statusCode: res.statusCode,
    body: res.body
  };
}

function errorSerializer(error: NodeJS.ErrnoException) {
  if (!isObject(error)) {
    return error;
  }

  let message = error.name || 'Error';
  message += ': ';

  if (has(error, 'message') && is.truthy(error.message)) {
    message += error.message;
  }

  const base = get(error, 'body.errors.base');

  if (is.array(base)) {
    message += base.join(', ');
  }

  const serialized: any = {
    message,
    code: error.code
  };

  if (has(error, 'stack') && is.number(error.code) && error.code > 404) {
    serialized.stack = error.stack;
  }

  return serialized;
}

const defaultOptions: Bunyan.LoggerOptions = {
  name: package$.name,
  level: 'error',
  serializers: {
    req: reqSerializer,
    res: resSerializer
  }
};

function applyFormat(loggerOptions: Bunyan.LoggerOptions) {
  if (
    !['local', 'development', 'test', 'qa', 'stage', 'production'].includes(process.env.ENV_NAME!)
  ) {
    return {};
  }

  const formatOut = new BanyanFormat({ outputMode: 'short' });
  const logLevel = loggerOptions.ignoreLogLevel ? 'info' : process.env.LOG_LEVEL;

  return extend(loggerOptions, {
    stream: formatOut,
    level: logLevel,
    serializers: extend(defaultOptions.serializers, {
      err: errorSerializer
    })
  });
}

function createLogger(name: string, loggerOptions?: Partial<Bunyan.LoggerOptions>): Bunyan {
  let options = defaults(loggerOptions, defaultOptions);
  options.name = name;
  applyFormat(options);
  options = omit(options, ['ignoreLogLevel', 'client']) as Bunyan.LoggerOptions;
  return Bunyan.createLogger(options);
}

export function getLogger(
  loggerName?: string,
  loggerOptions?: Partial<Bunyan.LoggerOptions>
): Bunyan {
  const name = loggerName || package$.name;
  const logger = loggers[name];

  if (is.truthy(logger)) {
    return logger;
  }

  const options = defaults(loggerOptions, {
    ignoreLogLevel: false,
    logLevel: process.env.LOG_LEVEL
  });

  const newLogger = createLogger(name, options);
  loggers[name] = newLogger;
  return newLogger;
}
