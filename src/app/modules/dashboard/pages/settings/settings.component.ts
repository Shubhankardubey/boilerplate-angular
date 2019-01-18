import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';

import {ViewStateModel} from '@shared/view-state.model';
import {APIRequestUtility} from '@shared/api-request.util';
import {AccountService, ProfileService} from '../../services';

// profile update form control mappings
const PROFILE_UPDATE_FORM_CTRL_MAPPINGS = {
  USER: [
    'first_name',
    'last_name',
    'contact_phone',
  ]
};

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit, AfterViewInit {
  // for template access
  updatePasswordFormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    new_password: new FormControl('', [Validators.required]),
    cnf_password: new FormControl('', [Validators.required])
  });
  updatePasswordViewState = new ViewStateModel();
  updatePasswordValidationErrors = {};
  accountLoadViewState = new ViewStateModel();
  profileLoadViewState = new ViewStateModel();
  updateProfileFormGroup = new FormGroup({});
  updateProfileViewState = new ViewStateModel();
  updateProfileValidationErrors = {};

  constructor(
    private translateService: TranslateService,
    private titleService: Title,
    private accountService: AccountService,
    private profileService: ProfileService,
  ) {
        this.accountLoadViewState.load();
    // get account
    this.accountService.get().subscribe(
      (account) => {
        this.accountLoadViewState.finishedWithSuccess();
      },
      (error) => {
        this.accountLoadViewState.finishedWithError(error);
      }
    );
  }

  ngOnInit(): void {
    this.translateService.get('PAGE_TITLES.SETTINGS').subscribe((title: string) => {
      this.titleService.setTitle(title);
    });
    // select mappings for profile update form group
    let selectedMappings: string[] = null;
    selectedMappings = PROFILE_UPDATE_FORM_CTRL_MAPPINGS.USER;
    // populate form group based on selected mappings
    selectedMappings.forEach((mapping) => {
      this.updateProfileFormGroup.addControl(mapping, new FormControl(''));
    });
    // update profile form should remain disabled by default
    this.updateProfileFormGroup.disable();
  }

  ngAfterViewInit(): void {
    // load profile
    this.profileLoadViewState.load();
    this.profileService.get().subscribe(
      (profile) => {
        // load common
        this.updateProfileFormGroup.patchValue({
          first_name: profile['basic']['first_name'],
          last_name: profile['basic']['last_name'],
          contact_phone: profile['contact']['phone'],
        });
      },
      (error) => {
        this.profileLoadViewState.finishedWithError(APIRequestUtility.parseError(error));
      },
    );
  }

  updatePassword() {
    this.updatePasswordViewState.load();
    // reset validation errors
    this.updatePasswordValidationErrors = {};
    // disable form fields
    this.updatePasswordFormGroup.disable();
    const formData = this.updatePasswordFormGroup.value;
    this.accountService.updatePassword(formData).subscribe(
      () => {
        this.updatePasswordViewState.finishedWithSuccess();
        // reset controls
        this.updatePasswordFormGroup.reset();
        // active it
        this.updatePasswordFormGroup.enable();
      },
      error => {
        this.updatePasswordFormGroup.enable();
        this.updatePasswordViewState.finishedWithError(APIRequestUtility.parseError(error, this.updatePasswordValidationErrors));
      }
    );
  }

  enableUpdateProfileForm() {
    this.updateProfileValidationErrors = {};
    this.updateProfileViewState.reset();
    this.updateProfileFormGroup.enable();
  }

  updateProfile() {
    this.updateProfileViewState.load();
    this.updateProfileValidationErrors = {};
    this.updateProfileFormGroup.disable();
    // send request
    this.profileService.update(this.updateProfileFormGroup.value).subscribe(
      () => {
        this.updateProfileViewState.finishedWithSuccess();
      },
      (error) => {
        this.updateProfileFormGroup.enable();
        this.updateProfileViewState.finishedWithError(APIRequestUtility.parseError(error, this.updateProfileValidationErrors));
      },
    );
  }
}
