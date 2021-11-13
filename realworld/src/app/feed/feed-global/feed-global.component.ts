import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  page:number = 0;
  skipPage:any = [];
  numberPage:any = [];
  constructor(
    private articleService: ArticleService,
    private route:Router,
    private activatedRoute:ActivatedRoute
    ) {}
  ngOnDestroy(): void {
    this.ob.unsubscribe();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramHome => {
      this.articleService.dataHome.next(paramHome);
    })
    this.ob = this.articleService.getArticles(5,0).subscribe((data: any) => {
      this.dataArticles = data;
      this.articles = this.dataArticles.articles;
      for (let i = 0; i < this.dataArticles.articlesCount;i+=5) {
        this.page++;
        this.skipPage.push(i);
        this.numberPage.push(this.page);
      }
      if (this.articleService !== undefined || this.articleService !== null) {
        this.isLoading = false;
      }
    });
  }
  getPage(i:number) {
    console.log(this.skipPage[i-1]);
    this.articleService.getArticles(5,this.skipPage[i-1]).subscribe((data:any) => {
      console.log(data);
      this.dataArticles = data;
      this.articles = this.dataArticles.articles;
      this.route.navigateByUrl(`/home/global-feed/${i}`)
    })
  }

  prePage() {

  }

  nextPage() {
  
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
