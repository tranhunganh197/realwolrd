import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Toaster } from 'ngx-toast-notifications';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public username!: string;
  public email!: string;
  public password!: string;
  public retypepassword!: string;
  public err!: string;
  isNotMatch: boolean = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private toaster: Toaster
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
  }
  handleCheck() {
    if (
      this.retypepassword !== this.password &&
      this.retypepassword.length > 0
    ) {
      this.isNotMatch = true;
    } else {
      this.isNotMatch = false;
    }
  }
  handleSignup(ngForm: NgForm): void {
    if (!this.isNotMatch) {
      this.userService.signup({
        user: {
          username: ngForm.value?.username,
          email: ngForm.value?.email,
          password: ngForm.value?.password,
        },
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
}