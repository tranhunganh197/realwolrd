import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Toast, Toaster } from 'ngx-toast-notifications';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { style } from '@angular/animations';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public name!: string;
  public email!: string;
  public user: any;
  public password!: string;
  public err!: string;

  constructor(
    private userService: UserService,
    private toaster: Toaster,
    private router: Router
  ) { }

  ngOnInit(): void { }

  handleLogin(ngForm: NgForm): void {
    this.userService.signin({
      user: { email: ngForm.value?.username, password: ngForm.value?.password },
    }).subscribe((data: any) => {
      console.log(data.user?.username);
      localStorage.setItem('token', data.user?.token);
      this.userService.setUser(data);
      this.userService.userData.next(data.user?.username);
      this.userService.tokenData.next(localStorage.getItem('token'));
      this.toaster.open({
        position: 'top-center',
        duration: 2000,
        caption: 'LOGIN SUCCESSFUL!',
        component: CustomToastComponent,
        type: 'success',
      });
      this.router.navigateByUrl('/');
    }, err => {
      this.toaster.open({
        position: 'top-center',
        duration: 3000,
        caption: 'WRONG USERNAME OR PASSWORD!',
        component: CustomToastComponent,
        type: 'danger',
      });
    });

  }
}
@Component({
  template:
    '<div style="padding: 10px;">' +
    '<div class="custom-caption">{{toast.caption}}</div>' +
    '</div>',
  styleUrls: ['./signin.component.scss'],

},

)
export class CustomToastComponent {
  @Input()
  toast!: Toast;
}