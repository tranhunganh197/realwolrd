import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  dataArticles:any[] = [];

  constructor(private articleService:ArticleService) { }

  ngOnInit(): void {
    this.articleService.getArticles();
    this.articleService.currentActicles.subscribe((data:any) => {
      this.dataArticles = data;
    })
  }

}
