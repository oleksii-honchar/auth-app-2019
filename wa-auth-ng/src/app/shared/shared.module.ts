import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './components';

import { AutofocusDirective } from './directives/autofocus.directive';
import { PasswordVerifyComponent } from './components/';

@NgModule({
  declarations: [ AutofocusDirective, PasswordVerifyComponent ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    AutofocusDirective,
    PasswordVerifyComponent
  ]
})
export class SharedModule { }
