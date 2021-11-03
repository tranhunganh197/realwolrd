import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ArticleComponent } from './article-new/article/article.component';
import { ArticleNewComponent } from './article/article-new/article-new.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { ArticleEditComponent } from './article/article-edit/article-edit.component';
import { SettingsComponent } from './settings/settings.component';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { TagsComponent } from './common/tags/tags.component';
import { FooterComponent } from './common/footer/footer.component';
import { ArticleAccountComponent } from './article-account/article-account.component';
import { MyFeedComponent } from './feed/my-feed/my-feed.component';
import { MyProfileComponent } from './profile/my-profile/my-profile.component';
import { MyArticleComponent } from './profile/my-article/my-article.component';
import { MyFavoriteComponent } from './profile/my-favorite/my-favorite.component';
import { FeedYourComponent } from './feed/feed-your/feed-your.component';
import { FeedGlobalComponent } from './feed/feed-global/feed-global.component';
import { FeedTagsComponent } from './feed/feed-tags/feed-tags.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    ArticleComponent,
    ArticleNewComponent,
    ArticleDetailComponent,
    ArticleEditComponent,
    SettingsComponent,
    NavBarComponent,
    TagsComponent,
    FooterComponent,
    ArticleAccountComponent,
    MyFeedComponent,
    MyProfileComponent,
    MyArticleComponent,
    MyFavoriteComponent,
    FeedYourComponent,
    FeedGlobalComponent,
    FeedTagsComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
