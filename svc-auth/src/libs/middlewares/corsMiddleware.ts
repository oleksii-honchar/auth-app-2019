import cors, { CorsOptions } from 'cors';
import { is } from '@src/libs/is';
import { getLogger } from '../logger';

const logger = getLogger('corsMiddleware');

process.env.CORS_WHITELIST = process.env.CORS_WHITELIST || '';

const corsWhitelist = process.env.CORS_WHITELIST.split(' ');
const corsConfig = {
  origin: (origin: string, callback: any) => {
    logger.debug(`origin: ${origin}`);
    const matched = corsWhitelist.reduce((total: string[], host: string) => {
      if (origin.includes(host)) {
        total.push(host);
      }
      return total;
    }, []);

    logger.debug('matched', matched);

    if (is.empty(matched)) {
      return callback(new Error('Not allowed by CORS'));
    }

    return callback(null, true);
  },
};

export const corsMiddleware = cors(corsConfig as CorsOptions);
