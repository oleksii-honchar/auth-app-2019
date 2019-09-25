import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components';
import { SharedModule } from '@app/shared';
import {
  ApiService,
  JwtService,
  VersionService,
  AuthService
} from '@app/core/services';

@NgModule({
  declarations: [ HeaderComponent ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [ HeaderComponent ],
  providers: [
    ApiService,
    AuthService,
    JwtService,
    VersionService
  ]
})
export class CoreModule { }
