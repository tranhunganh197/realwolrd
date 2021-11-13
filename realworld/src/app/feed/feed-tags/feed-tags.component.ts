import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-feed-tags',
  templateUrl: './feed-tags.component.html',
  styleUrls: ['./feed-tags.component.scss']
})
export class FeedTagsComponent implements OnInit {
  @Output() tag:any = new EventEmitter

  constructor(private articleService:ArticleService,private activatedRoute: ActivatedRoute) { }
  dataArticles:any;
  dataTags:any[] = [];
  ngOnInit(): void {
    this.articleService.getArticles(5,0)
    this.activatedRoute.params.subscribe(tag => {
      this.articleService.pushTag(tag?.id);
      this.articleService.currentActicles.subscribe((data:any) => {
        this.dataArticles = data;
        this.dataTags = this.dataArticles.articles.filter((article:any) => {
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
