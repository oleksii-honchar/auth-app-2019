import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header';

@NgModule({
  declarations: [ HeaderComponent ],
  imports: [
    CommonModule
  ],
  exports: [ HeaderComponent ]
})
export class CoreModule { }
