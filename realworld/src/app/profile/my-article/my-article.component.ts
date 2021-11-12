import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-article',
  templateUrl: './my-article.component.html',
  styleUrls: ['./my-article.component.scss'],
})
export class MyArticleComponent implements OnInit, OnDestroy {
  articles: any;
  ob: any;
  favoritesCount!: any;
  isFavorite!: any;
  isLoading: boolean = true;
  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ob = this.userService.currentParam.subscribe((param: string) => {
      this.userService.getProfile(param).subscribe((data: any) => {
        this.articleService
          .getMyArticles(data?.profile?.username)
          .subscribe((data: any) => {
            this.articles = data?.articles;
            if (this.articles !== undefined && this.articles.length > 0) {
              this.isLoading = false;
            }
          });
      });
    });
  }

  toggleLike(isFavoried: boolean, slug: string) {
    if (isFavoried) {
      this.articleService.unFavorite(slug).subscribe((data: any) => {
        this.articles.map((article: any, index: any) => {
          if (article?.slug === data?.article?.slug) {
            this.articles[index] = data?.article;
          }
        });
      });
    } else {
      console.log(isFavoried);
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
