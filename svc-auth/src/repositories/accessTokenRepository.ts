import { User } from 'src/models';
import { AccessToken } from 'src/models';
import { jwtService } from 'src/services';
import { AccessTokenScopes } from 'src/enums/AccessTokenScopes';
import { getLogger } from 'src/libs/logger';

class AccessTokenRepository {
  private ttl: number;
  private readonly logger: any;

  constructor (ttl: number) {
    this.ttl = ttl;
    this.logger = getLogger('AccessTokenRepository');
  }

  public async getForUser (user: User, scope: AccessTokenScopes) {
    const token: AccessToken | null = await AccessToken.findOne({ user, scope });

    if (token) return token;

    this.logger.debug('create new token');
    return AccessToken.create({
      user,
      scope,
      jwt: await jwtService.generate(user),
    });
  }
}

export const accessTokenRepository = new AccessTokenRepository(
  parseInt(process.env.ACCESS_TOKEN_TTL_SECONDS as string, 10),
);
