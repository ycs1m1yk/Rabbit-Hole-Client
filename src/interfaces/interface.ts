// TODO: optional 속성들 맞는지 검토 필요
export interface IUserProps {
    _id: string;
    name: string;
    track: string;
    trackCardinalNumber: number;
    position?: string;
    authImage: string;
    blogAddress?: string;
    githubEmail: string;
    githubProfileUrl: string;
    githubAvatar: string;
    carrots?: number;
    role?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ILikesProps {
    userId: string;
}

export interface ITagsProps {
    name: string;
}

export interface ICommentsProps {
    commentId: string;
}

export type IArticleTypes = 'question' | 'free' | 'study' | string

export interface IArticleProps {
    _id: string;
    articleType: IArticleTypes;
    author: string;
    authorId: string;
    title: string;
    content: string;
    likes: ILikesProps[];
    views: number;
    carrots?: number;
    tags: ITagsProps[];
    comments: ICommentsProps[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IArticleGetProps {
    [index: string]: any;
    articleType: IArticleTypes;
    filter?: string;
    page?: string;
    perPage?: string;
}

export interface IArticleGetByIdProps {
    [index: string]: any;
    page?: number;
    perPage?: number;
}

export interface IArticlePostProps {
    articleType: string;
    author: string;
    title: string;
    content: string;
    carrots: number;
    tags: ITagsProps[] | [];
}

export interface IArticlePutProps {
    title: string;
    content: string;
    tags?: ITagsProps[] | [];
}

export interface ICommentProps {
    _id: string;
    commentType: string;
    author: string;
    articleId: string;
    authorId: string;
    content: string;
    likes: ILikesProps[];
    isAdopted: boolean;
    createdAt: string;
    updatedAt: Date;
    __v: number;
}

export interface IPostCommentProps {
    commentType: string;
    articleId?: string;
    content: string | undefined;
}

export interface IChatProps {
    _id: string;
    roomType: string;
    username: string;
    message: string;
    time: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IProjectProps {
    _id: string;
    title: string;
    author: string;
    authorId: string;
    shortDescription: string;
    description: string;
    thumbnail: string;
    views: string;
    tags: ITagsProps[];
    likes: ILikesProps[];
    createdAt: string;
    updatedAt: Date;
    __v: number;
}

export interface IReportProps {
    _id: string;
    title: string;
    author: string;
    authorId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IMenteesProps {
    userId: string;
    username: string;
}

export interface IMentoringProps {
    _id: string;
    title: string;
    mentor: string;
    mentorId: string;
    mentees?: IMenteesProps[];
    content: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IRegisterFormProps {
    name: string;
    track: string;
    trackCardinalNumber: string;
    position?: string;
    blogAddress?: string;
    authImage: string;
    githubEmail: string;
    githubProfileUrl: string;
    githubAvatar: string;
}

export interface ISearchArticlesByTitleProps {
    [index: string]: IArticleTypes;
    title: string;
    articleType: IArticleTypes;
    filter: string;
    page: string;
    perPage: string;
}

export interface ISearchArticlesByUserIdProps {
    [index: string]: IArticleTypes;
    userId: string;
    articleType: IArticleTypes;
    filter: string;
    page: string;
    perPage: string;
}

export interface ISearchArticlesByAuthorProps {
    [index: string]: IArticleTypes;
    author: string;
    articleType: IArticleTypes;
    filter: string;
    page: string;
    perPage: string;
}

export interface ISearchProjectsByTitleProps {
    [index: string]: string;
    title: string;
    filter: string;
    page: string;
    perPage: string;
}

export interface ISearchProjectsByUserIdProps {
    [index: string]: string;
    userId: string;
    filter: string;
    page: string;
    perPage: string;
}

export interface ISearchProjectsByAuthorProps {
    [index: string]: string;
    author: string;
    filter: string;
    page: string;
    perPage: string;
}

export interface IProjectGetParamsProps {
    [index: string]: any;
    filter?: string;
    page: string;
    perPage: string;
}

export interface IProjectPostParamsProps {
    author: string;
    title: string;
    shortDescription: string;
    description: string | undefined;
    thumbnail: string;
    tags: ITagsProps[];
}

export interface IProjectPutParamsProps {
    author?: string;
    title?: string;
    shortDescription?: string;
    description?: string;
    thumbnail?: string;
    tags?: ITagsProps[];
}

export interface IUserPUTProps {
    name?: string;
    track?: string;
    trackCardinalNumber?: string;
    position?: string;
    githubEmail?: string;
    githubProfileUrl?: string;
}
