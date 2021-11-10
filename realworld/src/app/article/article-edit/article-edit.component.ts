import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {
  title!: string;
  description!: string;
  body!: string;
  tag!: string;
  id!: any;
  article!: any;

  constructor(private articleService: ArticleService,
    private router: Router, private route: ActivatedRoute) { }
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
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      // console.log(this.id);
    })
    this.articleService.getArticle(this.id).subscribe((data: any) => {
      this.article = data.article;
      console.log(this.article?.tagList);
      this.title = this.article?.title;
      this.description = this.article?.description;
      this.body = this.article?.body;
      this.tag = this.article?.tagList;

    })
  }
  handleUpdateArticle() {
    this.articleService
      .editArticle(this.id, {
        article: {
          title: this.title,
          description: this.description,
          body: this.body,
          tag: this.tag,
        },
      })
  }
}
