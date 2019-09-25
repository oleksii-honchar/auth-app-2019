import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  setToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  removeToken() {
    window.localStorage.removeItem('jwtToken');
  }

}
