import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ArticleService } from 'src/app/services/article.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';



@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss'],
})
export class ArticleNewComponent implements OnInit {
  htmlContent!: any;
  title!: any;
  about!: any;
  tags: any[] = [];
  article!: any;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  a =
    '<font face="Arial">sadasdasksaf</font><p><font face="Arial">adsandasdsaldkla</font></p><p><font face="Arial">&#273;&#226;nspd&#225;</font></p><p><font face="Arial">dsadasldsad,sa;</font></p>';

  constructor(private articleService: ArticleService, private route: Router) { }
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
          tagList: this.tags,
        },
      }).subscribe((data: any) => {
        console.log(data);
        this.route.navigateByUrl(`article/detail/${data?.article?.slug}`)
      })
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  ngOnInit(): void { }
}
