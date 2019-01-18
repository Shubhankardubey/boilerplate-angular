import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {APIService} from '@services/api.service';

import {AccountsComponent} from './accounts.component';
import {AccountsRouting} from './accounts.routing';
import {AccountsService} from './accounts.service';
import * as AccountsPages from './pages';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AccountsComponent,
    // pages
    AccountsPages.RegisterComponent,
    AccountsPages.LoginComponent,
    AccountsPages.PasswordResetComponent,
    AccountsPages.PasswordRecoverComponent,
  ],
  imports: [
    // common
    CommonModule,
    NgbModule,
    // routing
    AccountsRouting,
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
  ],
  providers: [
    APIService,
    AccountsService,
  ],
})

export class AccountsModule {
}
