import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})

export class AccountsComponent implements OnInit {

  constructor(
    private translateService: TranslateService,
    private titleService: Title,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.translateService.get('PAGE_TITLES.HOME').subscribe((title: string) => {
      this.titleService.setTitle(title);
    });
    const cookieExixts: boolean = this.cookieService.check('token');
    if (cookieExixts) {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
