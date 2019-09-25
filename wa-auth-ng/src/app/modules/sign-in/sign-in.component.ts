import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from '@src/environments/environment';
import { Errors } from '@app/core/interfaces';
import { AuthService } from '@app/core/services';
import { ValidatorService } from '@app/shared/services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {
  private form: FormGroup;
  private siteKey = environment['siteKey'];
  private isSubmitting = false;
  private errors: Errors = {};

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
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
    this.isSubmitting = true;
    this.errors = {};

    const credentials = this.form.value;
    this.authService
      .signIn(credentials)
      .subscribe(
        data => this.router.navigateByUrl('/dashboard'),
        err => {
          this.errors = err;
          this.isSubmitting = false;
          this.cd.detectChanges();
        }
      );
  }
}
