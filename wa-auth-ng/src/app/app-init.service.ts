import { Injectable } from '@angular/core';
import { VersionService } from '@app/core/services';

@Injectable()
export class AppInitService {
  constructor (private versionService: VersionService) {}

  init () {
    return this.versionService.get();
  }
}
