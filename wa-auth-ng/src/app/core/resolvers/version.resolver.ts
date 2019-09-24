import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

import { Version } from '@app/core/interfaces';
import { VersionService } from '@app/core/services';

// @Injectable({
//   providedIn: 'root',
// })
// export class VersionResolver implements Resolve<Version> {
//   private version$: Observable<Version>;
  // private version$: Observable<Version> = this.versionService
  //   .get()
  //   .pipe(
  //     tap(data => console.dir(data)),
  //     shareReplay(1)
  //   );

  // constructor (private versionService: VersionService) {}
  //
  // resolve (): Observable<Version> {
  //   return this.version$;
  // }
// }

