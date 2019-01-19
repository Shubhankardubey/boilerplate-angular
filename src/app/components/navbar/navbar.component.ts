import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';
import {ProfileService} from '../../modules/dashboard/services';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  isLogin: Boolean;
  firstName: any;
  constructor(
    private router: Router,
    private profileService: ProfileService
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url.includes('/dashboard')) {
        this.isLogin = true;
        this.profileService.get().subscribe(
          (profile) => {
            // load common
            this.firstName = profile['basic']['first_name'];
          },
          (error) => {},
        );
      }
    });
  }
  ngOnInit() {}
}
