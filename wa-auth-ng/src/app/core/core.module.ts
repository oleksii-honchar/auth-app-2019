import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components';
import { SharedModule } from '@app/shared';
import { ApiService, VersionService } from '@app/core/services';

@NgModule({
  declarations: [ HeaderComponent ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [ HeaderComponent ],
  providers: [ VersionService, ApiService ]
})
export class CoreModule { }
