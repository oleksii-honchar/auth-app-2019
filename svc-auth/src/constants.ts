import * as path from 'path';

export const STATIC_ASSETS_PATH = path.join(__dirname, 'assets');

/**
 * @see https://github.com/Automattic/mongoose/blob/master/lib/connectionstate.js
 */
export const MONGOOSE_CONNECTED_STATE = 1;

// when docker used mongo port is always 27017
export const MONGO_CONNECTION_PORT = 27017;

export const CONFIG_USER_SEND_EMAIL_ACTIVATION = false;
export const CONFIG_MAILER_FROM = '"Mailer Bot" <no-reply@ciklum.com>';
export const CONFIG_MAILER_ACTIVATION_EMAIL_SUBJECT = 'Activate your email';
