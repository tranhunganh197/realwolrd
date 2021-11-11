import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-feed-global',
  templateUrl: './feed-global.component.html',
  styleUrls: ['./feed-global.component.scss'],
})
export class FeedGlobalComponent implements OnInit {
  dataArticles!: any;
  articles: any;
  isLoading: boolean = true;
  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticles();
    this.articleService.currentActicles.subscribe((data: any) => {
      this.dataArticles = data;
      this.articles = this.dataArticles.articles;
      if (this.articleService !== undefined || this.articleService !== null) {
        this.isLoading = false;
      }
    });
  }
}
