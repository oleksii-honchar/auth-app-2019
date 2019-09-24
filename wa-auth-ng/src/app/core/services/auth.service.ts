import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Auth } from '@app/core/interfaces';

@Injectable()
export class AuthService {
  constructor (private apiService: ApiService) {}

  signIn(credentials: {}): Observable<Auth> {
    return this.apiService.post('/login', credentials)
      .pipe(map(data => data.version));
  }
}
