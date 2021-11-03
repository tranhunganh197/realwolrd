# realwolrd
# TECHNOLOGY: 
	BOOTSTRAP,
	FONTAWSOME,
	SCSS,
	MongoDB
# COMMON COMPONENT: 
	NAV-BAR:
	- LOGO 
	- HOME SIGN IN SIGN UP / HOME NEWARTICLE SETTINGS ACCOUNT ( *NgIF ) 
	TAGS: 
	- Popular Tags
	FOOTER:
	ACCOUNT FSOFT OF TEAM.
	ARTICLE-ACCOUNT
		+ avatar
		+ name
		+ date
		\\Edit điều hướng qua /article/edit/:id
		\\DELETE điều hướng qua /home
# ROUTING
# day 1-2: SIGN IN SIGN UP.
- /home | HomeComponent
- /settings | SettingsComponent
- /signin | SignInComponent
- /signup | SignUpConponent
* SOME COMMON COMPONENT
# day 3: Profile
- /profile/:id | MyProfileComponent
- /profile/:id/my-article | MyArticleComponent
- /profile/:id/my-favorite | MyFavoriteComponent
# day 4: Feed
- /home/your-feed | FeedYourComponent
- /home/global-feed | FeedGlobalComponent
- /home/tags | FeedTagsComponent
# day 5-6: ARTICLE
- /article/new/:id | ArticleNewComponent
- /article/edit/:id | ArticleEditComponent
- /article/detail/:id | ArticleDetailComponent
# day 7: Review Code
# day 8: Deloy App and Prepare Slide
