import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLogin: boolean = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.tokenData.next(localStorage.getItem('token'));
    this.userService.currentToken.subscribe(token => {
      if (token) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }
}
// duy