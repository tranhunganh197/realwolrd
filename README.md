# realwolrd
TECHNOLOGY: 
	BOOTSTRAP,
	FONTAWSOME,
	SCSS,
	MongoDB
COMMON COMPONENT: 
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
ROUTING
day 1: SIGN IN SIGN UP.
1./home ( Khi chưa đăng nhập )
2./signin ( điều hướng sang /home )
3./signup ( điều hướng sang /home )
day 2 - 3: HOME 
4./home ( Khi đã đăng nhập thành công ) 
5./article/new ( Thêm bài viết ) ( Điều hướng sang /article/:id )
	// Nếu của user thì có phần sửa xóa
	// Nếu không phải của user thì chỉ có comment and follow
6./settings ( SỬA USER và ĐĂNG XUẤT )
7./profile/:user
day 4: ARTICLE DETAIL
1.editor/edit/:id ( điều hướng về /article/:id )
2./tags/:tagname