import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';

@Component({
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})

export class AccountsComponent implements OnInit {

  constructor(
    private translateService: TranslateService,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.translateService.get('PAGE_TITLES.HOME').subscribe((title: string) => {
      this.titleService.setTitle(title);
    });
  }
}
