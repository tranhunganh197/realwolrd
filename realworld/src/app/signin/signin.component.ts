import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public name!: string;
  public password!: string;

  constructor() {}

  ngOnInit(): void {}

  handleLogin(ngForm: NgForm): void {
    console.log(ngForm);
    if (ngForm.form.status == 'INVALID') {
      return;
    } else {
      alert('Login successfully!');
    }
  }
}
