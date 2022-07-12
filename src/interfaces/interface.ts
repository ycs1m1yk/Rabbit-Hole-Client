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
    refreshToken: string;
    role?: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface ILikesProps {
  userId: string;
}

export interface ITagsProps {
  name: string;
}

export interface IArticleProps {
    _id: string;
    articleType: string;
    author: string;
    authorId: string;
    title: string;
    content: string;
    likes?: ILikesProps[];
    views?: number;
    carrots?: number;
    tags?: ITagsProps[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
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
    createdAt: Date;
    updatedAt: Date;
    __v: number;
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
    author: string;
    authorId: string;
    description: string;
    content: string;
    thumbnail: string;
    likes?: ILikesProps[];
    tags: ITagsProps[];
    createdAt: Date;
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
