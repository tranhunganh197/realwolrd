import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { NgForm } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
=======
import { ArticleService } from 'src/app/services/article.service';
>>>>>>> 69cadf1b6666f8dfd32c26c66e434ccf8aa4b3bf

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss'],
})
export class ArticleNewComponent implements OnInit {
  constructor() {}
  htmlContent!: any;
  title!: any;
  about!: any;
  tags!: any;

<<<<<<< HEAD
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  handleAddArticle(ngForm: NgForm) {
    console.log(2);
    if (ngForm.submitted) {
      ngForm.onReset();
    }
  }
  ngOnInit(): void {}
=======
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
>>>>>>> 69cadf1b6666f8dfd32c26c66e434ccf8aa4b3bf
}
