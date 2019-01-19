import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

import {ViewStateModel} from '@shared/view-state.model';
import {AccountsService} from '../../accounts.service';

@Component({
  templateUrl: './password-reset.component.html',
  styleUrls: [
    './password-reset.component.css'
  ]
})

export class PasswordResetComponent implements OnInit {
  resetPasswordFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  resetPasswordViewState = new ViewStateModel();
  resetPasswordValidationErrors = {};

  constructor(
    private translateService: TranslateService,
    private titleService: Title,
    private accountsService: AccountsService,
    private router: Router,
    private cookieService: CookieService
  ) {
  }

  ngOnInit() {
    this.translateService.get('PAGE_TITLES.RESET_PASSWORD').subscribe((title: string) => {
      this.titleService.setTitle(title);
    });
    const cookieExixts: boolean = this.cookieService.check('token');
  if (cookieExixts) {
    this.router.navigateByUrl('/dashboard');
  }
  }


  resetPassword() {
    this.resetPasswordViewState.load();
    // reset validation errors
    this.resetPasswordValidationErrors = {};
    // disable form fields
    this.resetPasswordFormGroup.disable();
    this.accountsService.resetPassword(this.resetPasswordFormGroup.value).subscribe(
      response => {
        this.resetPasswordViewState.finishedWithSuccess();
      },
      error => {
        // obtain error from response
        const err = error.error;
        // main error text to render
        let reqErrorText = null;
        this.resetPasswordFormGroup.enable();
        // iterate over errors if any
        // errors are treated as validation errors
        if (err.errors) {
          err.errors.forEach((validationError) => {
            const {param, msg} = validationError;
            // load accountCreationValidationErrors
            this.resetPasswordValidationErrors[param] = msg;
          });
        } else {
          // not a validation error - load main error
          reqErrorText = err.error;
        }
        this.resetPasswordViewState.finishedWithError(reqErrorText);
      }
    );
  }
}
