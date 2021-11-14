import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isLogin: boolean = false;
  href: any;
  username!: string;
  avatar!: string;
  hide: boolean = false;
  // khong sua doan nay
  hideTabs: boolean = false;
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
    if (
      e.target.className !== 'nav-link hidefunct' &&
      e.target.className !== 'avt-user'
    ) {
      this.hide = false;
    } else {
      this.hide = !this.hide;
    }
  }
  ///end///

  constructor(public router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.tokenData.next(localStorage.getItem('token'));
    this.userService.currentToken.subscribe((token) => {
      if (token) {
        this.isLogin = true;
        this.userService.getUser().subscribe((data) => {
          if (data.user.image === undefined) {
            this.avatar =
              'https://i.pinimg.com/564x/20/5a/c8/205ac833d83d23c76ccb74f591cb6000.jpg';
          } else {
            this.avatar = data?.user?.image;
          }
          this.username = data?.user?.username;
        });
      } else {
        this.isLogin = false;
      }
    });
  }

  logout() {
    localStorage.clear();
    this.userService.tokenData.next(localStorage.getItem('token'));
    this.router.navigateByUrl('/signin');
  }
}
