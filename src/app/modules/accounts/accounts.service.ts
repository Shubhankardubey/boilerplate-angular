import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {APIService} from '@services/api.service';

@Injectable({
  providedIn: 'root'
})

export class AccountsService {
  constructor(
    private apiService: APIService,
    private titleService: Title
  ) {
  }

  createAccount(data) {
    return this.apiService.request(APIService.Methods.POST, 'accounts', data);
  }

  setTitle(title: string) {
    this.titleService.setTitle('JTC - ' + title);
  }
}
