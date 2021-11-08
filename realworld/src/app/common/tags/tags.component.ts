import { Component, OnDestroy, OnInit } from '@angular/core';
import { observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags:string[] = [];
  tagsArr:any;
  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getTags().subscribe(tags => {
      this.tags = Object.values(tags);
      this.tagsArr = this.tags[0];
    })
  }
}
