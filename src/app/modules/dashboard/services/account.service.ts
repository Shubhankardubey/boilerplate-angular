import {Injectable} from '@angular/core';

import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  constructor(
    private cookieService: CookieService,
  ) {
  }

  logout() {
    // clear cookies
    this.cookieService.deleteAll('/');
  }
}
