import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-feed-tags',
  templateUrl: './feed-tags.component.html',
  styleUrls: ['./feed-tags.component.scss']
})
export class FeedTagsComponent implements OnInit {

  constructor(private articleService:ArticleService,private activatedRoute: ActivatedRoute) { }
  dataArticles:any;
  dataTags:any[] = [];
  ngOnInit(): void {
    this.articleService.getArticles()
    this.activatedRoute.params.subscribe(tag => {
      this.articleService.currentActicles.subscribe((data:any) => {
        this.dataArticles = data;
        this.dataTags = this.dataArticles.articles.filter((article:any) => {
          return article?.tagList.join('').indexOf(tag.id) !== -1;
        });
      })
    })
  }
}
