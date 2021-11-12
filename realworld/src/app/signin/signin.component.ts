import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Toaster } from 'ngx-toast-notifications';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
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
        type: 'success',
      });
      this.router.navigateByUrl('/');
    }, err => {
      this.toaster.open({
        position: 'top-center',
        duration: 5000,
        caption: 'LOGIN UNDEFINED ACCOUNT!',
        type: 'danger',
      });
    });

  }
}
