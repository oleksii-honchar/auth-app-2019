import { User } from 'src/models';
import { AccessToken } from 'src/models';
import { jwtService } from 'src/services';
import { AccessTokenScopes } from 'src/enums/AccessTokenScopes';

/**
 * Data provider service for AccessToken
 */
class AccessTokenRepository {
  private ttl: number;

  constructor (ttl: number) {
    this.ttl = ttl;
  }

  public async getForUser (user: User, scope: AccessTokenScopes) {
    const token: AccessToken | null = await AccessToken.findOne({ user, scope });

    if (token) return token;

    return AccessToken.create({
      user,
      jwt: await jwtService.generate(user),
    });
  }
}

export const accessTokenService = new AccessTokenRepository(
  parseInt(process.env.ACCESS_TOKEN_TTL_SECONDS as string, 10),
);
