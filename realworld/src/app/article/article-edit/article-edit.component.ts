import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ArticleService } from 'src/app/services/article.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Article } from 'src/app/article.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {
  title!: string;
  description!: string;
  body!: string;
  id!: string | null;
  article!: Article;
  tags: string[] = [];
  selectable:boolean = true;
  removable:boolean = true;
  addOnBlur:boolean = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private articleService: ArticleService,
    private userService:UserService,
    private router: Router, 
    private route: ActivatedRoute) { }
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
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

    })
    this.articleService.getArticle(this.id).subscribe((data: any) => {
      this.userService.getUser().subscribe((user:any) => {
        if (data?.article?.author?.username !== user?.user.username) {
          this.router.navigateByUrl(`/article/detail/${data?.article?.slug}`)
        } else {
          this.article = data.article;
          this.title = this.article?.title;
          this.description = this.article?.description;
          this.body = this.article?.body;
          this.tags = this.article?.tagList;
        }
      })
    })
  }
  handleUpdateArticle() {
    this.articleService
      .editArticle(this.id, {
        article: {
          title: this.title,
          description: this.description,
          body: this.body,
          tagList: this.tags,
        },
      })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}

