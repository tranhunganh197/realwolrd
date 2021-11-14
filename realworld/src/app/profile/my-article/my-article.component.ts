import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, Articles } from 'src/app/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-article',
  templateUrl: './my-article.component.html',
  styleUrls: ['./my-article.component.scss'],
})
export class MyArticleComponent implements OnInit, OnDestroy {
  articles: Article[] = [];
  ob: any;
  favoritesCount!: number;
  isFavorite!: boolean;
  isLoading: boolean = true;
  constructor(
    private articleService: ArticleService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.ob = this.userService.currentParam.subscribe((param: string) => {
      this.userService.getProfile(param).subscribe((data: any) => {
        this.articleService
          .getMyArticles(data?.profile?.username)
          .subscribe((data: any) => {
            this.articles = data?.articles;
            if (this.articles) {
              this.isLoading = false;
            }
          });
      });
    });
  }

  toggleLike(isFavoried: boolean | undefined, slug: string | undefined) {
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
