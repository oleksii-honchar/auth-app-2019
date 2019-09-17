import * as path from 'path';

/*
  when in prod:
    ./dist/bundle.js - svc bundle path
    ../dist/assets - assets served from
  when local:
    ./src/index.ts
    ./assets - assets served from
 */

let staticAssetsPath = '';
if (process.env.NODE_ENV === 'production') {
  staticAssetsPath = path.join(__dirname, 'assets');
} else {
  staticAssetsPath = path.join(__dirname, 'assets');
}

export const STATIC_ASSETS_PATH = staticAssetsPath;


/**
 * @see https://github.com/Automattic/mongoose/blob/master/lib/connectionstate.js
 */
export const MONGOOSE_CONNECTED_STATE = 1;

// when docker used mongo port is always 27017
export const MONGO_CONNECTION_PORT = 27017;

export const CONFIG_USER_SEND_EMAIL_ACTIVATION = false;
export const CONFIG_MAILER_FROM = '"Mailer Bot" <no-reply@ciklum.com>';
export const CONFIG_MAILER_ACTIVATION_EMAIL_SUBJECT = 'Activate your email';
