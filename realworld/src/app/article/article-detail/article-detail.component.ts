import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  id: any;
  currentUser: any;
  canModify!: boolean;
  article: any;


  constructor(private route: ActivatedRoute, private userService: UserService, private articleService: ArticleService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      // console.log(this.id);
    })
    this.articleService.getArticle(this.id).subscribe((data: any) => {
      this.article = data.article;
      console.log(this.article);
    })

    this.userService.getUser().subscribe((data) => {
      this.currentUser = data;
      console.log(this.currentUser);
      this.canModify = (this.currentUser?.user?.username === this.article?.author.username);
    })


  }
  deleteArticle() {

    console.log(this.article.slug)
    this.articleService.deleteArticle(this.article.slug)
      .subscribe(
        data => {
          this.router.navigateByUrl('/');
        }
      );

  }

}
