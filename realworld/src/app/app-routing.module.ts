import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SettingsComponent } from './settings/settings.component';
import { FeedYourComponent } from './feed/feed-your/feed-your.component';
import { FeedGlobalComponent } from './feed/feed-global/feed-global.component';
import { MyProfileComponent } from './profile/my-profile/my-profile.component';
import { MyArticleComponent } from './profile/my-article/my-article.component';
import { MyFavoriteComponent } from './profile/my-favorite/my-favorite.component';
import { FeedTagsComponent } from './feed/feed-tags/feed-tags.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { ArticleEditComponent } from './article/article-edit/article-edit.component';
import { ArticleNewComponent } from './article/article-new/article-new.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './auth.guard';
import { LoginedGuard } from './logined.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home/global-feed/1', pathMatch: 'full' },
  { path: 'home', redirectTo: 'home/global-feed/1', pathMatch: 'full' },
  { path: 'notfound', component: NotfoundComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'your-feed/:id', component: FeedYourComponent, canActivate:[AuthGuard] },
      { path: 'global-feed/:id', component: FeedGlobalComponent },
      { path: 'tags/:id', component: FeedTagsComponent },
    ],
  },
  { path: 'settings', component: SettingsComponent, canActivate:[AuthGuard] },
  { path: 'signin', component: SigninComponent, canActivate:[LoginedGuard] },
  { path: 'signup', component: SignupComponent, canActivate:[LoginedGuard] },
  {
    path: 'profiles/:id',
    component: MyProfileComponent,
    children: [
      { path: '', redirectTo: 'my-article', pathMatch: 'full' },
      { path: 'my-article', component: MyArticleComponent },
      { path: 'my-favorite', component: MyFavoriteComponent, canActivate:[AuthGuard] },
    ],
  },
  { path: 'article/detail/:id', component: ArticleDetailComponent },
  { path: 'article/edit/:id', component: ArticleEditComponent, canActivate:[AuthGuard] }, 
  { path: 'article/new', component: ArticleNewComponent,canActivate:[AuthGuard] },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
