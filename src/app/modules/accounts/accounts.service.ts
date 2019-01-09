import {Injectable} from '@angular/core';
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
    return this.apiService.request(APIService.Methods.POST, 'accounts', data);
  }
}
