import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as Raven from 'raven-js';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Angulartics2Module} from 'angulartics2';
import {Angulartics2Mixpanel} from 'angulartics2/mixpanel';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {CookieService} from 'ngx-cookie-service';

import CONFIG from '@config';
import {AppComponent} from './app.component';
import {AppRouting} from './app.routing';
import * as AppModules from './modules';
import * as AppServices from './services';
import {NavbarComponent, FooterComponent} from './components';
import {AboutUsComponent, FeaturesComponent} from './pages';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
// import {C} from '@angular/core/src/render3';

// build declarations
const declarations = [
  // app components
  AppComponent,
  NavbarComponent,
  FooterComponent,
  // app pages
  AboutUsComponent,
  FeaturesComponent
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

Raven
  .config(CONFIG.sentryDSN, {
    environment: CONFIG.sentryENV
  })
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err);
  }
}

export class LocalErrorHandler implements ErrorHandler {
  handleError(err: any) {
    console.error(err);
  }
}

@NgModule({
  declarations,
  imports: [
    // app routing
    AppRouting,
    // browser module
    BrowserModule,
    // bootstrap
    NgbModule,
    // for advanced form directives
    ReactiveFormsModule,
    FormsModule,
    // routing
    AppRouting,
    // modules
    AppModules.AccountsModule,
    // logging
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      // will log ERROR to CONFIG.serverLogUrl
      serverLoggingUrl: CONFIG.serverLogUrl,
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
    // translation
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    // analytics
    Angulartics2Module.forRoot([
      Angulartics2Mixpanel,
      Angulartics2GoogleAnalytics
    ])
  ],
  providers: [
    {provide: ErrorHandler, useClass: CONFIG.sentryDSN ? RavenErrorHandler : LocalErrorHandler},
    // bootstrap modal service
    NgbActiveModal,
    // cookie service
    CookieService,
    // services
    AppServices.IntercomService,
    AppServices.APIService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(public translate: TranslateService) {
    // for initializing translation service
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de/) ? browserLang : 'en');
    // for initializing mixpanel
    // mixpanel.init(CONFIG.mixpanelToken);
    // for initializing google analytics
    // ga('create', CONFIG.gaTrackingId, 'auto');
  }
}
