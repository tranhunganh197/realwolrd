import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  name!: string;
  email!: string;
  password!: string;
  urlAvatar =
    'https://i.pinimg.com/564x/20/5a/c8/205ac833d83d23c76ccb74f591cb6000.jpg';
  constructor() {}

  ngOnInit(): void {}

  handleUpdate(ngForm: NgForm) {
    console.log(ngForm.value);
  }
}
