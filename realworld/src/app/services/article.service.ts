import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles!: any[];
  dataActicles:any = new ReplaySubject<any>(1);
  currentActicles:any = this.dataActicles.asObservable();

  constructor(private http:HttpClient) { }

  getArticles() {
    this.http.get('http://localhost:3000/api/articles').subscribe(data => {
      console.log(data);
      this.dataActicles.next(data);
    })
  }

  getMyArticles(username:string) {
    return this.http.get(`http://localhost:3000/api/articles/?author=${username}`)
  }

  getFavoriteArticles(username:string) {
    return this.http.get(`http://localhost:3000/api/articles/?favorited=${username}`)
  }

  getTagsArticles(tagname:string) {
    return this.http.get(`http://localhost3000/api/articles/?tag=${tagname}`)
  }
}
