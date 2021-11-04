import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-article',
  templateUrl: './my-article.component.html',
  styleUrls: ['./my-article.component.scss']
})
export class MyArticleComponent implements OnInit {

  myArticlesData:any;

  constructor(
    private articleService:ArticleService,
    private userService:UserService,
  ) { }

  ngOnInit(): void {
    console.log(this.userService.user);
    this.articleService.getMyArticles('username').subscribe(data => {
      this.myArticlesData = data;
    })
  }

}
