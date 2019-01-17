import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  constructor(
    private translateService: TranslateService,
    private titleService: Title,
  ) {
  }

async ngOnInit() {
    this.translateService.get('PAGE_TITLES.DASHBOARD_HOME').subscribe((title: string) => {
      this.titleService.setTitle(title);
    });
  }
}
