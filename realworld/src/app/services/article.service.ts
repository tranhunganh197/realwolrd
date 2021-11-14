import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles!: any[];
  article: any;
  dataTag: any = new ReplaySubject(1);
  currentTag: any = this.dataTag.asObservable();
  dataHome: any = new ReplaySubject(1);
  currentHome: any = this.dataHome.asObservable();
  dataYour: any = new ReplaySubject(1);
  currentYour: any = this.dataYour.asObservable();

  constructor(private http: HttpClient, private router: Router,) { }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
    };
  }

  getArticles(limit:number,offset:number) {
    return this.http.get(`http://localhost:3000/api/articles?limit=${limit}&offset=${offset}`, this.getHttpOptions())
  }

  getYourArticles(limit:number,offset:number) {
    return this.http.get(`http://localhost:3000/api/articles/feed?limit=${limit}&offset=${offset}`, this.getHttpOptions())
  }

  getMyArticles(username: string) {
    return this.http.get(`http://localhost:3000/api/articles/?author=${username}`, this.getHttpOptions())
  }

  getFavoriteArticles(username: string) {
    return this.http.get(`http://localhost:3000/api/articles/?favorited=${username}`)
  }

  getTagsArticles(tagname: string) {
    return this.http.get(`http://localhost:3000/api/articles/?tag=${tagname}`)
  }

  createArticle(article: any) {
    return this.http.post('http://localhost:3000/api/articles', article, this.getHttpOptions())
  }

  getArticle(id: any) {
    return this.http.get(`http://localhost:3000/api/articles/${id}`,this.getHttpOptions())
  }

  editArticle(id: any, article: any) {
    this.http.put(`http://localhost:3000/api/articles/${id}`, article, this.getHttpOptions()).subscribe((data: any) => {
      this.router.navigateByUrl(`/article/detail/${id}`);
    })
  }

  deleteArticle(id: any) {
    return this.http.delete(`http://localhost:3000/api/articles/${id}`, this.getHttpOptions())
  }

  getTags() {
    return this.http.get('http://localhost:3000/api/tags');
  }

  addComment(param: string, comment: any) {
    return this.http.post(`http://localhost:3000/api/articles/${param}/comments`, comment, this.getHttpOptions())
  }

  getComments(param: string) {
    return this.http.get(`http://localhost:3000/api/articles/${param}/comments`, this.getHttpOptions());
  }

  deleteComment(param: string, id: any) {
    this.http.delete(`http://localhost:3000/api/articles/${param}/comments/${id?._id}`, this.getHttpOptions()).subscribe()
  }

  pushTag(tag: any) {
    this.dataTag.next(tag);
  }

  favorite(slug: string) {
    return this.http.post(`http://localhost:3000/api/articles/${slug}/favorite`, {}, this.getHttpOptions())
  }

  unFavorite(slug: string) {
    return this.http.delete(`http://localhost:3000/api/articles/${slug}/favorite`, this.getHttpOptions())
  }
}
