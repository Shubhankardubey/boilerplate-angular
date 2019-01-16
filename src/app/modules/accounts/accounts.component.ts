import {Component} from '@angular/core';

import {AccountsService} from '../accounts/accounts.service';

@Component({
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})

export class AccountsComponent {

  constructor(
    private accountsService: AccountsService,
  ) {}

  ngOnInit() {
    this.accountsService.setTitle('Home');
  }
}
