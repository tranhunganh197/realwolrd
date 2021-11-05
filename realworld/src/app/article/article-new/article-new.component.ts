import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss'],
})
export class ArticleNewComponent implements OnInit {
  htmlContent!: any;
  title!: any;
  about!: any;
  tags!: any;

  constructor(private articleService:ArticleService) { }

  ngOnInit(): void {
    this.articleService.createArticle({
      article: {
      title: "How to train your dragon",
      description: "Ever wonder how?",
      body: "You have to believe",
      tagList: ["reactjs", "angular", "dragons"]
      }
    })
  }

  createArticle() {
    
  }
}
