import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { SharedModule } from 'src/app/shared';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxCaptchaModule
  ]
})
export class SignInModule { }
