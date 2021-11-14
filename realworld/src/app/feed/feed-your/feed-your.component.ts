import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-feed-your',
  templateUrl: './feed-your.component.html',
  styleUrls: ['./feed-your.component.scss'],
})
export class FeedYourComponent implements OnInit {
  articles!: any;
  isLoading: boolean = true;
  page: number = 0;
  skipPage: any = [];
  numberPage: any = [];
  dataArticles: any;
  ob: any;
  currentPage!: number;
  constructor(
    private articleService: ArticleService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramYour => {
      this.articleService.dataYour.next(paramYour);
    })
    this.ob = this.articleService.getYourArticles(5, 0).subscribe((data: any) => {
      this.dataArticles = data;
      this.articles = this.dataArticles.articles;
      for (let i = 0; i < this.dataArticles.articlesCount; i += 5) {
        this.page++;
        this.skipPage.push(i);
        this.numberPage.push(this.page);
      }
      if (this.dataArticles) {
        this.isLoading = false;
      }
    });
  }

  getPage(i: number) {
    this.currentPage = i;
    this.articleService.getArticles(5, this.skipPage[i - 1]).subscribe((data: any) => {
      console.log(data);
      this.dataArticles = data;
      this.articles = this.dataArticles.articles;
      this.route.navigateByUrl(`/home/your-feed/${i}`)
    })
  }

  prePage() {
    if (this.currentPage >= 2) {
      this.getPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.numberPage.length) {
      this.getPage(this.currentPage + 1);
    }
  }

  toggleLike(isFavoried: boolean, slug: string) {
    if (isFavoried) {
      this.articleService.unFavorite(slug).subscribe((data: any) => {
        this.articles.map((article: any, index: any) => {
          if (article?.slug === data?.article?.slug) {
            this.articles[index] = data?.article;
          }
        });
      })
    } else {
      console.log(isFavoried)
      this.articleService.favorite(slug).subscribe((data: any) => {
        this.articles.map((article: any, index: any) => {
          if (article?.slug === data?.article?.slug) {
            this.articles[index] = data?.article;
          }
        });
      })
    }
  }
}



