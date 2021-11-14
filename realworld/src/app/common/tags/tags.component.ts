import { Component, OnDestroy, OnInit } from '@angular/core';
import { observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tagsArr:string[] = [];
  tags!:string;
  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getTags().subscribe(tags => {
      this.tagsArr = Object.values(tags);
      this.tags = this.tagsArr[0];
      this.tags = this.tags.slice(0,10);
    })
  }
}
