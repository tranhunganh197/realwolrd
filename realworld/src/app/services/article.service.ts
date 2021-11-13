import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles!: any[];
  dataActicles: any = new ReplaySubject<any>(1);
  currentActicles: any = this.dataActicles.asObservable();
  article: any;
  dataTag: any = new ReplaySubject(1);
  currentTag: any = this.dataTag.asObservable();


  constructor(private http: HttpClient, private router: Router,) { }

  getArticles(limit:number,offset:number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
    };
    this.http.get(`http://localhost:3000/api/articles?limit=${limit}&offset=${offset}`, httpOptions).subscribe(data => {
      this.dataActicles.next(data);
    })
  }

  getYourArticles(limit:number,offset:number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
    };
    return this.http.get(`http://localhost:3000/api/articles/feed?limit=${limit}&offset=${offset}`, httpOptions)
  }

  getMyArticles(username: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
    };
    return this.http.get(`http://localhost:3000/api/articles/?author=${username}`, httpOptions)
  }

  getFavoriteArticles(username: string) {
    return this.http.get(`http://localhost:3000/api/articles/?favorited=${username}`)
  }

  getTagsArticles(tagname: string) {
    return this.http.get(`http://localhost:3000/api/articles/?tag=${tagname}`)
  }

  createArticle(article: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
    };
    return this.http.post('http://localhost:3000/api/articles', article, httpOptions)
  }

  getArticle(id: any) {
    return this.http.get(`http://localhost:3000/api/articles/${id}`)
  }

  editArticle(id: any, article: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
    };
    this.http.put(`http://localhost:3000/api/articles/${id}`, article, httpOptions).subscribe((data: any) => {
      console.log(data);
      this.router.navigateByUrl('/home');
    })
  }

  deleteArticle(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
    };
    return this.http.delete(`http://localhost:3000/api/articles/${id}`, httpOptions)
  }

  getTags() {
    return this.http.get('http://localhost:3000/api/tags');
  }

  addComment(param: string, comment: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
    };
    return this.http.post(`http://localhost:3000/api/articles/${param}/comments`, comment, httpOptions)
  }

  getComments(param: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
    };
    return this.http.get(`http://localhost:3000/api/articles/${param}/comments`, httpOptions);
  }

  deleteComment(param: string, id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
    };
    this.http.delete(`http://localhost:3000/api/articles/${param}/comments/${id?._id}`, httpOptions).subscribe()
  }

  pushTag(tag: any) {
    this.dataTag.next(tag);
  }

  favorite(slug: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.post(`http://localhost:3000/api/articles/${slug}/favorite`, {}, httpOptions)
  }

  unFavorite(slug: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.delete(`http://localhost:3000/api/articles/${slug}/favorite`, httpOptions)
  }
}
