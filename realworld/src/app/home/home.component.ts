import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLogin:boolean = false;
  param!:string;
  constructor(
    private userService:UserService,
    private articleService:ArticleService,
    private cdr:ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    this.userService.tokenData.next(localStorage.getItem('token'));
    this.userService.currentToken.subscribe(token => {
      if (token) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
    this.articleService.currentTag.subscribe((data:any) => {
      this.param = data;
    })
  }

  ngAfterViewChecked() { 
    this.cdr.detectChanges();
  }
}
// duy