import { Component, Input } from '@angular/core';

import { Errors } from '@app/core/interfaces';
import { is } from '@app/core/libs/is';

@Component({
  selector: 'list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.scss']
})
export class ListErrorsComponent {
  formattedErrors: Array<string> = [];

  constructor() {}

  @Input()
  set errors(errorList: Errors) {
    if (is.empty(errorList)) { return; }

    this.formattedErrors = Object.keys(errorList || {})
      .map(key => `${key}: ${errorList[key]}`);
  }

  get errorList() { return this.formattedErrors; }

}
