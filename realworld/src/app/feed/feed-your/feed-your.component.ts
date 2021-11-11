import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-your',
  templateUrl: './feed-your.component.html',
  styleUrls: ['./feed-your.component.scss'],
})
export class FeedYourComponent implements OnInit {
  articles!: any;
  isLoading: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}
