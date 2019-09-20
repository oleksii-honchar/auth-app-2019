import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorService, PasswordService } from '@app/shared/services';

@Component({
  selector: 'password-verify',
  templateUrl: './password-verify.component.html',
  styleUrls: ['./password-verify.component.scss']
})
export class PasswordVerifyComponent implements OnInit {
  private form: FormGroup;
  private errorMatcher = PasswordService.errorMatcher;

  @Input() parentForm = new FormGroup({});
  @Input() icon = '';
  @Input() focusActivated = true;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) {
    this.form = this.fb.group(
      {
        password: ['', [
          Validators.required,
          Validators.pattern(this.validatorService.passwordPattern)
        ]],
        confirmPassword: ['', Validators.required]
      }, {
        validator: PasswordService.checkPasswords
      }
    );
  }

  ngOnInit(): void {
    this.parentForm.addControl('verifyPassword', this.form);
  }
}
