import { Strategy as LocalStrategy } from 'passport-local';
import * as passport from 'passport';

import { User } from 'src/models';
import { userRepository } from 'src/repositories';
import { passwordService } from 'src/services';
import { getLogger } from '../logger';

const logger = getLogger('loginMiddleware');

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    session: false,
  },
  async (email, password, cb) => {
    let user: User | null;

    logger.debug('looking for user by email');
    user = await userRepository.findUserByEmail(email);
    if (!user) return cb(null, false);

    const isPasswordMatch = await passwordService.compare(password, user.passwordHash);
    if (!isPasswordMatch) return cb(null, false);

    return cb(null, user);
  },
));

export const loginMiddleware = passport.authenticate(
  'local',
  { session: false }
);
