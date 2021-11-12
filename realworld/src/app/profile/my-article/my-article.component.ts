import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userService.currentParam.subscribe((param:string) => {
      this.userService.getProfile(param).subscribe((data:any) => {
        this.articleService.getMyArticles(data?.profile?.username).subscribe((data:any) => {
          this.articles = data?.articles;
          console.log(this.articles)
        })
      })
    })
  }

}
