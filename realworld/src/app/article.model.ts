export interface Author {
    bio:string,
    following:boolean,
    image:string,
    username:string 
}

export interface dataArticle {
    article: Article
}

export interface Article {
    author:Author,
    body:string,
    createdAt:string,
    description: string,
    favorited:boolean,
    favoritesCount:number,
    slug:string,
    tagList:string[],
    title:string,
    updatedAt:string
}

export interface Articles {
    articles:Article[],
    articlesCount:number
}