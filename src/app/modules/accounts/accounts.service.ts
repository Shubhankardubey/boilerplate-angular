import {Injectable} from '@angular/core';

import {APIService} from '@services/api.service';

@Injectable({
  providedIn: 'root'
})

export class AccountsService {
  constructor(
    private apiService: APIService,
  ) {
  }

  createAccount(data) {
    return this.apiService.request(APIService.Methods.POST, 'accounts', data);
  }
}
