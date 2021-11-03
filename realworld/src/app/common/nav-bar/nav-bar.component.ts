import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isLogin: boolean = false;
  isNotAuthPage: boolean = false;
  href: any;
  constructor(public router: Router) {
    this.router.events.subscribe((event) => {
      let a = this.router.url;
      if (a == '/signup' || a == '/signin') {
        this.isNotAuthPage = false;
      } else {
        this.isNotAuthPage = true;
      }
    });
  }

  ngOnInit(): void {}
}
