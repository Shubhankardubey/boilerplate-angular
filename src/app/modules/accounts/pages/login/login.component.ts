import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

import {ViewStateModel} from '@shared/view-state.model';
import {AccountsService} from '../../accounts.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  accountLoginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  accountLoginViewState = new ViewStateModel();
  accountLoginValidationErrors = {};

  constructor(
    private accountsService: AccountsService,
    private router: Router,
    private translateService: TranslateService,
    private titleService: Title,
  ) {
  }

  async ngOnInit() {
    this.translateService.get('PAGE_TITLES.ACCOUNTS_LOGIN').subscribe((title: string) => {
      this.titleService.setTitle(title);
    });
  }

  login() {
    this.accountLoginViewState.load();
    // reset validation errors
    this.accountLoginValidationErrors = {};
    // disable form fields
    this.accountLoginFormGroup.disable();
    this.accountsService.login(this.accountLoginFormGroup.value).subscribe(
      async () => {
        // navigate logged in user to dashboard
        console.log('login');
      },
      error => {
        // obtain error from response
        const err = error.error;
        // main error text to render
        let reqErrorText = null;
        this.accountLoginFormGroup.enable();
        // iterate over errors if any
        // errors are treated as validation errors
        if (err.errors) {
          err.errors.forEach((validationError) => {
            const {param, msg} = validationError;
            // load accountCreationValidationErrors
            this.accountLoginValidationErrors[param] = msg;
          });
        } else {
          // not a validation error - load main error
          reqErrorText = err.error;
        }
        this.accountLoginViewState.finishedWithError(reqErrorText);
      }
    );
  }
}
