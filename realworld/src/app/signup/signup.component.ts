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
  public err!: string;
  constructor(
    private userService: UserService,
    private router: Router,
    private toaster: Toaster
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  handleSignup(ngForm: NgForm): void {
    this.userService.signup({
      user: {
        username: ngForm.value?.username,
        email: ngForm.value?.email,
        password: ngForm.value?.password,
      },
    });
    this.userService.currentUser.subscribe((data) => {
      if (data === 422) {
        this.err = 'Email or password is invalid';
        return;
      } else {
        this.toaster.open({
          position: 'top-center',
          duration: 2000,
          caption: 'SIGNUP SUCCESSFUL!',
          type: 'success',
        });
        localStorage.setItem('token', data?.token);
        this.router.navigateByUrl('/');
      }
    });
  }
}
