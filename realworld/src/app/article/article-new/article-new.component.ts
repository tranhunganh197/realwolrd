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

  a =
    '<font face="Arial">sadasdasksaf</font><p><font face="Arial">adsandasdsaldkla</font></p><p><font face="Arial">&#273;&#226;nspd&#225;</font></p><p><font face="Arial">dsadasldsad,sa;</font></p>';

  constructor(private articleService: ArticleService) {}
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
    if (ngForm.submitted) {
      this.articleService.createArticle({
        article: {
          title: this.title,
          description: this.title,
          body: this.htmlContent,
          tagList: this.tags.split(','),
        },
      });
      ngForm.onReset();
    }
  }

  ngOnInit(): void {}
}
