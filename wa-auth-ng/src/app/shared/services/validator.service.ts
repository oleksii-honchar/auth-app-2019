import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  emailPattern = /^\w+[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  passwordPattern = /^(?=(.*[a-zA-Z].*){2,})(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,100}$/;

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched();
      }

      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
