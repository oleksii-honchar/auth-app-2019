import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './components';

import { AutofocusDirective } from './directives/autofocus.directive';
import { PasswordVerifyComponent, ListErrorsComponent } from './components/';

@NgModule({
  declarations: [
    AutofocusDirective,
    ListErrorsComponent,
    PasswordVerifyComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    AutofocusDirective,
    ListErrorsComponent,
    PasswordVerifyComponent
  ]
})
export class SharedModule { }
