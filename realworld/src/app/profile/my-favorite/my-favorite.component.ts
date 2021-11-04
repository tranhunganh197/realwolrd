import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-favorite',
  templateUrl: './my-favorite.component.html',
  styleUrls: ['./my-favorite.component.scss']
})
export class MyFavoriteComponent implements OnInit {

  dataFavorite:any;

  constructor(
    private articleService:ArticleService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.articleService.getFavoriteArticles('username').subscribe(data => {
      this.dataFavorite = data;
    })
  }

}
