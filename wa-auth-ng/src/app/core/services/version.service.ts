import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Version } from '../interfaces';
import { map } from 'rxjs/operators';

@Injectable()
export class VersionService {
  constructor (
    private apiService: ApiService
  ) {}

  get(): Observable<Version> {
    return this.apiService.get('/version')
      .pipe(map(data => data.version));
  }
}
