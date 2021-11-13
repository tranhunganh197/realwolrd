import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-feed-global',
  templateUrl: './feed-global.component.html',
  styleUrls: ['./feed-global.component.scss'],
})
export class FeedGlobalComponent implements OnInit,OnDestroy {
  dataArticles!: any;
  articles: any;
  isLoading: boolean = true;
  ob:any;
  constructor(private articleService: ArticleService) {}
  ngOnDestroy(): void {
    this.ob.unsubscribe();
  }

  ngOnInit(): void {
    this.articleService.getArticles(5,5);
    this.ob = this.articleService.currentActicles.subscribe((data: any) => {
      this.dataArticles = data;
      this.articles = this.dataArticles.articles;
      if (this.articleService !== undefined || this.articleService !== null) {
        this.isLoading = false;
      }
    });
  }

  toggleLike(isFavoried:boolean,slug:string) {
    if (isFavoried) {
      this.articleService.unFavorite(slug).subscribe((data:any)  => {
        this.articles.map((article:any,index:any) => {
          if (article?.slug === data?.article?.slug) {
            this.articles[index] = data?.article;
          }
        });
      })
    } else {
      console.log(isFavoried)
      this.articleService.favorite(slug).subscribe((data:any) => {
        this.articles.map((article:any,index:any) => {
          if (article?.slug === data?.article?.slug) {
            this.articles[index] = data?.article;
          }
        });
      })
    }
  }
}
