import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

import {ViewStateModel} from '@shared/view-state.model';
import {AccountsService} from '../../accounts.service';

@Component({
  templateUrl: './password-recover.component.html',
  styleUrls: [
    './password-recover.component.css'
  ]
})

export class PasswordRecoverComponent implements OnInit {
  code: String;
  recoverPasswordFormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    cnf_password: new FormControl('', [Validators.required])
  });
  validateResetCodeViewState = new ViewStateModel();
  recoverPasswordViewState = new ViewStateModel();
  recoverPasswordValidationErrors = {};

  constructor(
    private translateService: TranslateService,
    private titleService: Title,
    private accountsService: AccountsService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
  ) {
  }

  ngOnInit() {
    this.translateService.get('PAGE_TITLES.RECOVER_PASSWORD').subscribe((title: string) => {
      this.titleService.setTitle(title);
    });
    this.code = this.route.snapshot.paramMap.get('code');
    this.validateResetCodeRequest();
    const cookieExixts: boolean = this.cookieService.check('token');
    if (cookieExixts) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  validateResetCodeRequest() {
    this.validateResetCodeViewState.load();
    this.accountsService.validateResetCode(this.code).subscribe(
      response => {
        this.validateResetCodeViewState.finishedWithSuccess();
      },
      error => {
        this.validateResetCodeViewState.finishedWithError(error.error.error);
      }
    );
  }

  updatePassword() {
    this.recoverPasswordViewState.load();
    // reset validation errors
    this.recoverPasswordValidationErrors = {};
    // disable form fields
    this.recoverPasswordFormGroup.disable();
    const formData = this.recoverPasswordFormGroup.value;
    formData.code = this.code;
    this.accountsService.resetPassword(formData).subscribe(
      async () => {
        await this.router.navigateByUrl('/login');
      },
      error => {
        // obtain error from response
        const err = error.error;
        // main error text to render
        let reqErrorText = null;
        this.recoverPasswordFormGroup.enable();
        // iterate over errors if any
        // errors are treated as validation errors
        if (err.errors) {
          err.errors.forEach((validationError) => {
            const {param, msg} = validationError;
            // load recoverPasswordValidationErrors
            this.recoverPasswordValidationErrors[param] = msg;
          });
        } else {
          // not a validation error - load main error
          reqErrorText = err.error;
        }
        this.recoverPasswordViewState.finishedWithError(reqErrorText);
      }
    );
  }
}
