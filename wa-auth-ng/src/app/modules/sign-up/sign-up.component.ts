import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorService } from '@app/shared';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  private siteKey = '6LcWhbkUAAAAAKaG3JoHPgVSMCGcdcMrBNVBSK5Z';
  private form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern(this.validatorService.emailPattern)
      ]],
      recaptcha: ['', Validators.required]
    });
  }

  markFormFieldsAsTouched(form: FormGroup): void {
    if (!form.valid) {
      this.validatorService.validateAllFormFields(form);
    }
  }
}
