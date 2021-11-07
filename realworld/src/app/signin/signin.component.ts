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
  ) {}

  ngOnInit(): void {}

  handleLogin(ngForm: NgForm): void {
    this.userService.signin({
      user: { email: ngForm.value?.username, password: ngForm.value?.password },
    });
    this.userService.currentUser.subscribe((data) => {
      if (data === 422) {
        this.err = 'Email or password is invalid';
        return;
      } else {
        this.toaster.open({
          position: 'top-center',
          duration: 2000,
          caption: 'LOGIN SUCCESSFUL!',
          type: 'success',
        });
        localStorage.setItem('token', data?.token);
        this.router.navigateByUrl('/');
      }
    });
  }
}
