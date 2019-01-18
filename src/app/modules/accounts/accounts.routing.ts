import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {AccountsComponent} from './accounts.component';
import * as AccountsPages from './pages';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AccountsComponent,
        children: [
          {
            path: 'register',
            component: AccountsPages.RegisterComponent,
          },
          {
            path: 'login',
            component: AccountsPages.LoginComponent,
          },
          {
            path: 'accounts/reset',
            component: AccountsPages.PasswordResetComponent,
          },
          {
            path: 'accounts/recover/:code',
            component: AccountsPages.PasswordRecoverComponent,
          },
        ]
      }
    ])
  ],
  exports: [RouterModule]
})

export class AccountsRouting {
}
