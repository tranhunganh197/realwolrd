import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-article',
  templateUrl: './my-article.component.html',
  styleUrls: ['./my-article.component.scss']
})
export class MyArticleComponent implements OnInit {

  articles:any;

  constructor(
    private articleService:ArticleService,
    private userService:UserService,
  ) { }

  ngOnInit() {
    this.userService.getUser().subscribe(data => {
      this.articleService.getMyArticles(data?.user?.username).subscribe((data:any) => {
        this.articles = data?.articles;
        console.log(this.articles)
      })
    })
  }

}
