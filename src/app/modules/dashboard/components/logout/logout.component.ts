import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AccountService} from '../../services';

@Component({
  template: ''
})

export class LogoutComponent {
  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {
    accountService.logout();
    // noinspection JSIgnoredPromiseFromCall
    router.navigateByUrl('/login');
  }
}
