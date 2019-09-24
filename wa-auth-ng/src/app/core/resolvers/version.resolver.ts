import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Version } from '@app/core/interfaces';
import { VersionService } from '@app/core/services';

@Injectable({
  providedIn: 'root',
})
export class VersionResolver implements Resolve<Version> {
  constructor (private versionService: VersionService) {}

  resolve (): Observable<Version> {
    return this.versionService.get();
  }
}

