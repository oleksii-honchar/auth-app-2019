import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Version } from '../interfaces';
import { map } from 'rxjs/operators';

@Injectable()
export class VersionService {
  public version: Version = { version: 'n/a' };

  constructor (private apiService: ApiService) {}

  get(): Promise<Version> {
    return this.apiService.get('/version')
      .pipe(map(data => data.version))
      .toPromise()
      .then(data => this.version = data);
  }
}
