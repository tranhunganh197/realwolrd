import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  name!: string;
  email!: string;
  password!: string;
  bio!:string;
  urlAvatar!: string;
  message!:string;

  constructor(private userService: UserService,private router:Router) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((data) => {
      this.name = data?.user?.username;
      this.email = data?.user?.email;
      this.password = data?.user?.password;
      this.bio = data?.user?.bio;
      if (data?.user?.image === undefined) {
        this.urlAvatar = 'https://i.pinimg.com/564x/20/5a/c8/205ac833d83d23c76ccb74f591cb6000.jpg';
      } else {
        this.urlAvatar = data?.user?.image;
      }
    });
  }

  handleUpdate() {
    this.userService.settingsUser({
      user: {
        email: this.email,
        bio: this.bio,
        image: this.urlAvatar,
        password: this.password,
      },
    }).subscribe(data => {
      if (data) {
        this.router.navigateByUrl('/home');
      } else {
        this.message ="Failure";
      }
    })
  }
}