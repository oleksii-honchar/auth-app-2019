import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { SharedModule } from '@app/shared';

import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxCaptchaModule
  ]
})
export class SignUpModule { }
