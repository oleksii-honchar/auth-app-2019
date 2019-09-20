import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [ HeaderComponent ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [ HeaderComponent ]
})
export class CoreModule { }
