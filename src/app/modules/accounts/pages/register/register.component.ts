import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {ViewStateModel} from '@shared/view-state.model';
import {AccountsService} from '../../accounts.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})

export class RegisterComponent implements OnInit {
  accountCreationFormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    contact_phone: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    cnf_password: new FormControl(''),
  });
  accountCreationViewState = new ViewStateModel();
  accountCreationValidationErrors = {};

  constructor(
    private accountsService: AccountsService,
  ) {
  }

  ngOnInit() {

  }

  createAccount() {
    this.accountCreationViewState.load();
    // reset validation errors
    this.accountCreationValidationErrors = {};
    // disable form fields
    this.accountCreationFormGroup.disable();
    // pre-process data - falsy entries will not be sent
    const data = {};
    const values = this.accountCreationFormGroup.value;
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        data[key] = values[key];
      }
    });
    this.accountsService.createAccount(data).subscribe(
      async () => {
        this.accountCreationFormGroup.reset();
        this.accountCreationFormGroup.enable();
        this.accountCreationViewState.finishedWithSuccess();
        // redirect to login page
        console.log('done');
      },
      error => {
        // obtain error from response
        const err = error.error;
        // main error text to render
        let reqErrorText = null;
        this.accountCreationFormGroup.enable();
        // iterate over errors if any
        // errors are treated as validation errors
        if (err.errors) {
          err.errors.forEach((validationError) => {
            const {param, msg} = validationError;
            // load accountCreationValidationErrors
            this.accountCreationValidationErrors[param] = msg;
          });
        } else {
          // not a validation error - load main error
          reqErrorText = err.error;
        }
        this.accountCreationViewState.finishedWithError(reqErrorText);
      }
    );
  }
}
