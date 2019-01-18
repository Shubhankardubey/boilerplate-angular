import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

import {APIService} from '@services/api.service';

@Injectable({
  providedIn: 'root'
})

export class AccountsService {
  constructor(
    private apiService: APIService,
    private cookieService: CookieService,
  ) {
  }

  createAccount(data) {
    return this.apiService.request(APIService.Methods.POST, 'accounts/register', data);
  }

  login(data) {
    return new Observable((observer) => {
      this.apiService.request(APIService.Methods.POST, 'accounts/login', data).subscribe(
        response => {
          // get stuff from response
          // @ts-ignore - unrecognized props
          const {access_token, expires_in} = response;
          // convert timestamp to locale date
          const expiry = new Date(Date.now() + (expires_in * 1000));
          // set cookie
          this.cookieService.set('token', access_token, expiry, '/');
          observer.next();
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  resetPassword(data) {
    return this.apiService.request(APIService.Methods.POST, 'accounts/reset', data);
  }

  validateResetCode(data) {
    return this.apiService.request(APIService.Methods.GET, `accounts/reset?code=${data}`, data);
  }
}
