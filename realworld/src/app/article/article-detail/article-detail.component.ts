import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  id: any;
  currentUser: any;
  canModify: boolean = false;
  article: any;
  comment!: string;
  commentArr: any[] = [];
  imgUser!: string;
  isDelete: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private articleService: ArticleService,
    private router: Router
  ) {}
  @HostListener('document:click', ['$event'])
  clickOutside(e: any) {
    console.log(e);
    if (e.target.className == 'btn btn-outline-danger btn-delete') {
      this.isDelete = true;
    }
    if (
      e.target.className == 'confirm_delete' ||
      e.target.className == 'btn btn-outline-secondary cancel' ||
      e.target.className == 'btn btn-outline-danger confirm'
    ) {
      this.isDelete = false;
    }
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      // console.log(this.id);
    });
    this.articleService.getArticle(this.id).subscribe((data: any) => {
      this.article = data.article;
      console.log(this.article);
    });

    this.userService.getUser().subscribe((data) => {
      this.currentUser = data;
      console.log(this.currentUser);
      this.imgUser = this.currentUser?.user?.image;
      this.canModify =
        this.currentUser?.user?.username === this.article?.author.username;
    });

    this.articleService.getComments(this.id).subscribe((data: any) => {
      this.commentArr = data?.comments;
    });
  }
  deleteArticle() {
    console.log(this.article.slug);
    this.articleService.deleteArticle(this.article.slug).subscribe((data) => {
      this.router.navigateByUrl('/');
    });
  }

  addComment() {
    if (this.comment === '') {
      return;
    } else {
      this.articleService
        .addComment(this.id, {
          comment: {
            body: this.comment,
          },
        })
        .subscribe((a: any) => {
          this.commentArr.unshift(a?.comment);
        });
    }
  }

  deleteComment(comment: any) {
    console.log(comment);
    this.articleService.deleteComment(this.id, comment);
    this.articleService.getComments(this.id).subscribe((data: any) => {
      this.commentArr = data?.comments;
      console.log(this.commentArr);
    });
  }
}
