import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article, Articles } from 'src/app/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-favorite',
  templateUrl: './my-favorite.component.html',
  styleUrls: ['./my-favorite.component.scss'],
})
export class MyFavoriteComponent implements OnInit {
  dataFavorite!: Articles;
  isLoading: boolean = true;
  ob:any;
  articles:Article[] = [];

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private route:Router
  ) {}

  ngOnInit(): void {
    this.ob = this.userService.currentParam.subscribe((param: string) => {
      this.userService.getProfile(param).subscribe((data: any) => {
        this.articleService
          .getFavoriteArticles(data?.profile?.username)
          .subscribe((data: any) => {
            this.articles = data?.articles;
            this.articles.forEach((element:any) => {
              element.favorited = true;
            });
            if (this.articles) {
              this.isLoading = false;
            }
          });
      });
    });
  }

  toggleLike(isFavoried: boolean | undefined, slug: string | undefined) {
    if (!localStorage.getItem('token')) {
      this.route.navigateByUrl('/signin')
    }
    if (isFavoried) {
      this.articleService.unFavorite(slug).subscribe((data: any) => {
        this.articles.map((article: any, index: any) => {
          if (article?.slug === data?.article?.slug) {
            this.articles[index] = data?.article;
          }
        });
      });
    } else {
      this.articleService.favorite(slug).subscribe((data: any) => {
        this.articles.map((article: any, index: any) => {
          if (article?.slug === data?.article?.slug) {
            this.articles[index] = data?.article;
          }
        });
      });
    }
  }

  ngOnDestroy() {
    this.ob.unsubscribe();
  }
}
