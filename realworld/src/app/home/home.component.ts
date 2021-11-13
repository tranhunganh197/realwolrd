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
  paramHome!:string;
  paramYour!:string;
  
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
    this.articleService.currentHome.subscribe((data:any) => {
      this.paramHome = data?.id;
    })
    this.articleService.currentYour.subscribe((data:any) => {
      console.log(data);
      this.paramYour = data?.id;
      console.log(this.paramYour)
    })
  }

  ngAfterViewChecked() { 
    this.cdr.detectChanges();
  }
}
// duy