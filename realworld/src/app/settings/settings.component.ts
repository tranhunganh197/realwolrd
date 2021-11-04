import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  urlAvatar =
    'https://i.pinimg.com/564x/20/5a/c8/205ac833d83d23c76ccb74f591cb6000.jpg';

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    
  }

  handleUpdate(ngForm: NgForm) {
    console.log(ngForm.value);
  }

  setUser() {
    this.userService.settingsUser({user: {
      email: 'ahihi@gmail.com',
      bio: 'I like to ahihi',
      image: "https://i.stack.imgur.com/xHWG8.jpg"
    }})
  }

  getUser() {
    this.userService.getUser().subscribe(data => {
      console.log(data);
    })
  }
}
