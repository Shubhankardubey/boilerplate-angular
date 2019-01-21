import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {DashboardComponent} from './dashboard.component';
import * as DashboardComponents from './components';
import * as DashboardPages from './pages';
import * as DashboardServices from './services';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'logout',
        component: DashboardComponents.LogoutComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [DashboardServices.AuthGuardService],
        children: [
          {
            path: '',
            component: DashboardPages.HomeComponent,
          },
          {
            path: 'settings',
            component: DashboardPages.SettingsComponent,
          },
        ]
      }
    ])
  ],
  exports: [RouterModule]
})

export class DashboardRouting {
}
