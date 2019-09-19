import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components';
import { SharedModule } from 'src/app/shared';

@NgModule({
  declarations: [ HeaderComponent ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ HeaderComponent ]
})
export class CoreModule { }
