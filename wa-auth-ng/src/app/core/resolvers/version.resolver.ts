import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Version } from '@app/core/interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class VersionResolver implements Resolve<Version> {
  constructor (private versionService: VersionService) {}

  resolve (): Observable<Version> {
    return this.versionService.getVersion();
  }
}

