import { User } from 'src/models';
import { AccessToken } from 'src/models/AccessToken';
import { jwtService } from 'src/services/jwtService';
import { AccessTokenScopes } from 'src/enums/AccessTokenScopes';

class AccessTokenService {
  private ttl: number;

  constructor (ttl: number) {
    this.ttl = ttl;
  }

  public async getForUser (user: User, scope: AccessTokenScopes) {
    const token: AccessToken | null = await AccessToken.findOne({ user, scope });

    if (token) return token;

    return AccessToken.create({
      user,
      jwt: await jwtService.generate(user)
    });
  }
}

export const accessTokenService = new AccessTokenService(
  parseInt(process.env.ACCESS_TOKEN_TTL_SECONDS as string, 10)
);
