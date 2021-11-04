import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService,private http:HttpClient) { }

  ngOnInit(): void {
    this.userService.signup({user: {
      username: "Jacob",
      email: "jake@jake.jake",
      password: "jakejake",
    }})
  }

  login() {
    this.userService.signin({user: {
      email: "jake@jake.jake",
      password: "jakejake",
    }})
  }
}
