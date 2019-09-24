import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorService } from '@app/shared/services';
import { environment } from '@src/environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {
  private form: FormGroup;
  private siteKey = environment['siteKey'];

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
      recaptcha: ['', Validators.required]
    });
  }

  markFormFieldsAsTouched(form: FormGroup): void {
    if (!form.valid) {
      this.validatorService.validateAllFormFields(form);
    }
  }

  onSubmit (form: FormGroup) {
    this.markFormFieldsAsTouched(form);
    console.log(108);
  }
}
