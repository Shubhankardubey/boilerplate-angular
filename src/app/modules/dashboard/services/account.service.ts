import {Injectable} from '@angular/core';

import {APIService} from '@services/api.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  constructor(
    private cookieService: CookieService,
    private apiService: APIService,
  ) {
  }

  logout() {
    // clear cookies
    this.cookieService.deleteAll('/');
  }

  updatePassword(data) {
    return this.apiService.request(APIService.Methods.POST, 'account/reset', data);
  }

  get() {
    return this.apiService.request(APIService.Methods.GET, 'account');
  }
}
