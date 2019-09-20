import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { SharedModule } from 'src/app/shared';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SignInModule { }
