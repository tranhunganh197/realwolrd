import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  
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
