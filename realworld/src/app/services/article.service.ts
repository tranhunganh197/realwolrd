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
  urlBase = "http://localhost:3000";
  constructor(private http: HttpClient, private router: Router,) { }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
    };
  }

  getArticles(limit: number, offset: number) {

    return this.http.get(`${this.urlBase}/api/articles?limit=${limit}&offset=${offset}`, this.getHttpOptions())
  }

  getYourArticles(limit: number, offset: number) {
    return this.http.get(`${this.urlBase}/api/articles/feed?limit=${limit}&offset=${offset}`, this.getHttpOptions())
  }

  getMyArticles(username: string) {
    return this.http.get(`${this.urlBase}/api/articles/?author=${username}`, this.getHttpOptions())
  }

  getFavoriteArticles(username: string) {
    return this.http.get(`${this.urlBase}/api/articles/?favorited=${username}`)
  }

  getTagsArticles(tagname: string) {
    return this.http.get(`${this.urlBase}/api/articles/?tag=${tagname}`)
  }

  createArticle(article: any) {
    return this.http.post(`${this.urlBase}/api/articles`, article, this.getHttpOptions())
  }

  getArticle(id: any) {
    return this.http.get(`${this.urlBase}/api/articles/${id}`, this.getHttpOptions())
  }

  editArticle(id: any, article: any) {
    this.http.put(`${this.urlBase}/api/articles/${id}`, article, this.getHttpOptions()).subscribe(data => {
      this.router.navigateByUrl(`/article/detail/${id}`);
    })
  }

  deleteArticle(id: any) {
    return this.http.delete(`${this.urlBase}/api/articles/${id}`, this.getHttpOptions())
  }

  getTags() {
    return this.http.get(`${this.urlBase}/api/tags`);
  }

  addComment(param: string | null, comment: any) {
    return this.http.post(`${this.urlBase}/api/articles/${param}/comments`, comment, this.getHttpOptions())
  }

  getComments(param: string | null) {
    return this.http.get(`${this.urlBase}/api/articles/${param}/comments`, this.getHttpOptions());
  }

  deleteComment(param: string | null, id: any) {
    this.http.delete(`${this.urlBase}/api/articles/${param}/comments/${id?._id}`, this.getHttpOptions()).subscribe()
  }

  pushTag(tag: any) {
    this.dataTag.next(tag);
  }

  favorite(slug: string | undefined) {
    return this.http.post(`${this.urlBase}/api/articles/${slug}/favorite`, {}, this.getHttpOptions())
  }

  unFavorite(slug: string | undefined) {
    return this.http.delete(`${this.urlBase}/api/articles/${slug}/favorite`, this.getHttpOptions())
  }
}
