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
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})

export class AccountsRouting {
}
