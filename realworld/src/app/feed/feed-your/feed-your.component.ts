import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-feed-your',
  templateUrl: './feed-your.component.html',
  styleUrls: ['./feed-your.component.scss'],
})
export class FeedYourComponent implements OnInit {
  articles!: any;
  isLoading: boolean = true;
  constructor(private articleService:ArticleService) {}

  ngOnInit(): void {}

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



