import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Auth, Credentials } from '@app/core/interfaces';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor (
    private apiService: ApiService,
    private jwtService: JwtService
  ) {}

  signIn(credentials: Credentials): Observable<Auth> {
    return this.apiService
      .post('/login', credentials)
      .pipe(tap(data => {
        this.jwtService.setToken(data.token);
      }));
  }
}
