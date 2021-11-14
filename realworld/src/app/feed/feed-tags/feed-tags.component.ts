import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, Articles } from 'src/app/article.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-feed-tags',
  templateUrl: './feed-tags.component.html',
  styleUrls: ['./feed-tags.component.scss']
})
export class FeedTagsComponent implements OnInit {

  constructor(private articleService:ArticleService,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }
  dataArticles!:Articles;
  articles:Article[] = [];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(tag => {
      this.articleService.pushTag(tag?.id);
      this.articleService.getArticles(10,0).subscribe((data:any) => {
        this.dataArticles = data;
        this.articles = this.dataArticles.articles.filter((article:any) => {
          if (article?.tagList) {
            return article?.tagList.join(',').indexOf(tag.id) !== -1;
          } else {
            return;
          }
        });
      })
    })
  }

  toggleLike(isFavoried: boolean | undefined, slug: string | undefined) {
    if (!localStorage.getItem('token')) {
      this.route.navigateByUrl('/signin')
    }
    if (isFavoried) {
      this.articleService.unFavorite(slug).subscribe((data:any) => {
        this.articles.map((article: Article, index: any) => {
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
