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
// Xong tao bracnh
// Tao o file front thif nho vi tri
// truowc khi code thi pull
// add .
// commit 
// pull 1 lan nua
// xong push len nhanh e vua Tao. Tao roi thi khong can tao lai push luon len nhanh da co san
// Xong len trang git xem co cai compare ko anh chua luwu neen chua dk