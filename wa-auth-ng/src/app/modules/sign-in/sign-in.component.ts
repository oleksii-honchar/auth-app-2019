import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorService } from '@app/shared/services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  private form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(this.validatorService.emailPattern)
      ]],
      password: [ '', Validators.required ],
    });
  }

  markFormFieldsAsTouched(form: FormGroup): void {
    if (!form.valid) {
      this.validatorService.validateAllFormFields(form);
    }
  }
}
