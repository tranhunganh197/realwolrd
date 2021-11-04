import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  dataProfile:any;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getProfile('username').subscribe(data => {
      this.dataProfile = data;
    })
  }

  

}
