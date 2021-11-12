import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  dataProfile:any;
  isUser!:boolean;
  name!:string;
  constructor(private userService:UserService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.userService.pushParam(param?.id)
      this.userService.getProfile(param?.id)
      .subscribe(profile => {
        this.dataProfile = profile;
        this.userService.getUser().subscribe(user => {
          if(user?.user?.username === this.dataProfile?.profile?.username) {
            this.isUser = true;
            this.name = 'My';
          } else {
            this.isUser = false;
            this.name = this.dataProfile?.profile?.username;
          }
        })
      })
    })
  }
}
