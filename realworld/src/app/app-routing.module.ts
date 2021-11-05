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

const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch: 'full'},
  // { path: '**', redirectTo: '/notfound' },
  {path:'notfound', component:NotfoundComponent},
  {path:'home', component: HomeComponent,
    children: [
      {path: 'your-feed', component: FeedYourComponent},
      {path: 'global-feed', component: FeedGlobalComponent},
    ]
  },
  {path:'settings', component: SettingsComponent},
  {path:'tags', component: FeedTagsComponent},
  {path:'signin', component: SigninComponent},
  {path:'signup', component: SignupComponent},
  {path:'profiles/:id', component: MyProfileComponent,
    children: [
      {path:'my-article', component: MyArticleComponent},
      {path:'my-favorite', component: MyFavoriteComponent},
    ]
  },
  {path:'article/detail/:id', component:ArticleDetailComponent},
  {path:'article/edit/:id', component:ArticleEditComponent},
  {path:'article/new', component:ArticleNewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
