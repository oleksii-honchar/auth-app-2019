import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './components';

import { AutofocusDirective } from './directives/autofocus.directive';

@NgModule({
  declarations: [ AutofocusDirective ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    AutofocusDirective
  ]
})
export class SharedModule { }
