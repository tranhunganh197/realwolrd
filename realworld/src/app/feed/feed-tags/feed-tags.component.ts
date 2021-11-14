import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, Articles } from 'src/app/article.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-feed-tags',
  templateUrl: './feed-tags.component.html',
  styleUrls: ['./feed-tags.component.scss']
})
export class FeedTagsComponent implements OnInit {

  constructor(private articleService:ArticleService,private activatedRoute: ActivatedRoute) { }
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
}
