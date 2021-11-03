import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public name!: string;
  public email!: string;
  public password!: string;
  constructor() {}

  ngOnInit(): void {}

  handleSignup(ngForm: NgForm): void {
    console.log(ngForm);
    if (ngForm.form.status == 'INVALID') {
      return;
    } else {
      alert('Signup successfully!');
    }
  }
}
