import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {DashboardComponent} from './dashboard.component';
import {DashboardRouting} from './dashboard.routing';
import * as DashboardComponents from './components';
import * as DashboardPages from './pages';
import * as DashboardServices from './services';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    DashboardComponent,
    // components
    DashboardComponents.LogoutComponent,
    // pages
    DashboardPages.HomeComponent,
  ],
  imports: [
    // common
    CommonModule,
    NgbModule,
    // routing
    DashboardRouting,
    // translation
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true,
    }),
    // for advanced form directives
    ReactiveFormsModule,
    FormsModule,
    // dropdown selection module
    NgSelectModule,
  ],
  providers: [
    // auth guard services
    DashboardServices.AuthGuardService
  ]
})

export class DashboardModule {
}
