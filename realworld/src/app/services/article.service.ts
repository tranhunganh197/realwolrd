import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles!: any[];
  dataActicles:any = new ReplaySubject<any>(1);
  currentActicles:any = this.dataActicles.asObservable();
  article:any;

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

  createArticle(article:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
    };
    this.http.post('http://localhost3000/api/articles',article,httpOptions).subscribe(data => {
      console.log(data);
      this.article = data;
    })
  }

  getArticle(id:any) {
    return this.http.get(`http://localhost3000/api/articles/${id}`)
  }

  editArticle(id:any,article:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
    };
    this.http.put(`http://localhost3000/api/articles/${id}`,article,httpOptions).subscribe(data => {
      console.log(data);
    })
  }

  deleteArticle(id:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
    };
    this.http.delete(`http://localhost3000/api/articles/${id}`,httpOptions)
  }
}
