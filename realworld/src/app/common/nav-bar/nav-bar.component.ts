import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isLogin: boolean = true;
  isNotAuthPage: boolean = false;
  href: any;
  // khong sua doan nay
  hideTabs: boolean = true;
  @HostListener('document:click', ['$event'])
  clickOutside(e: any) {
    if (
      e.target.className !==
      'mat-icon notranslate material-icons mat-icon-no-color'
    ) {
      this.hideTabs = false;
    } else {
      this.hideTabs = !this.hideTabs;
    }
  }
  ///end///

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
