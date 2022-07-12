// React Query의 fetcher function은 반드시 json의 Promise를 반환
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

// 회원가입
export const postRegister = (bodyData: Object | null) => fetch(`${BASE_URL}/users/register`, { method: 'POST', body: JSON.stringify(bodyData) }).then((res) => res.json());

// 로그인
export const getUserLogin = () => fetch(`${BASE_URL}/auth/github/login`).then((res) => res.json());

// 내 정보 삭제하기
export const deleteUser = (token: string) => fetch(`${BASE_URL}/users`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }).then((res) => res.json());

// 내 정보 수정하기
export const updateUserProfile = (token: string, bodyData: Object | null) => fetch(`${BASE_URL}/users`, { method: 'PUT', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(bodyData) }).then((res) => res.json());

// 내 정보 보기
export const getMyPage = () => fetch(`${BASE_URL}/users/mypage`).then((res) => res.json());

// 다른 사람 정보 보기
export const getOtherPage = (token: string, githubEmail: string) => fetch(`${BASE_URL}/users/${githubEmail}`, {
  headers: { Authorization: `Bearer ${token}` },
}).then((res) => res.json());

// 댓글 작성
export const postComment = (token: string, bodyData: Object | null) => fetch(`${BASE_URL}/comments`, {
  method: 'POST',
  body: JSON.stringify(bodyData),
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}).then((res) => res.json());

// 댓글 수정
export const updateCommentById = (token: string, commentId: string, bodyData: Object | null) => fetch(`${BASE_URL}/comments/${commentId}`, {
  method: 'POST',
  body: JSON.stringify(bodyData),
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}).then((res) => res.json());

// 댓글 삭제
export const deleteCommentById = (token: string, commentId: string) => fetch(`${BASE_URL}/comments/${commentId}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((res) => res.json());

// 댓글 좋아요
export const increaseCommentLikes = (token: string, commentId: string) => fetch(`${BASE_URL}/comments/${commentId}/heart`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((res) => res.json());

// 댓글 채택
export const adoptComment = (token: string, commentId: string) => fetch(`${BASE_URL}/comments/${commentId}/adoption`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((res) => res.json());

// 채팅 조회
export const getChattingLog = (roomType? : string) => fetch(`${BASE_URL}?room=${roomType}`).then((res) => res.json());

// 채팅 페이지네이션, 이미지 전송 및 이미지 구현 -> 추후 작성

// 게시글 작성
export const createArticle = (token: string, bodyData: Object | null) => fetch(`${BASE_URL}/articles`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(bodyData),
}).then((res) => res.json());

// 게시글 수정
export const updateArticleById = (token: string, articleId: string, bodyData: Object | null) => fetch(`${BASE_URL}/articles?=${articleId}`, {
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(bodyData),
}).then((res) => res.json());

// 게시글 삭제
export const deleteArticleById = (token: string, articleId: string) => fetch(`${BASE_URL}/articles/${articleId}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((res) => res.json());

// 게시글 조회
export const getArticleById = (articleId: string) => fetch(`${BASE_URL}/articles/${articleId}`)
  .then((res) => res.json());

/*
전체 게시글 조회
params: articleId, filter, page, perPage
*/
export const getAllArticle = (params: any) => {
  const param = new URLSearchParams(params);
  const par = param.toString();

  return fetch(`${BASE_URL}/articles?${par}`)
    .then((res) => res.json());
};

// 게시글 좋아요
export const increaseArticleLikes = (token: string, articleId: string) => fetch(`${BASE_URL}/${articleId}`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
}).then((res) => res.json());

/*
제목 검색
params: author, type
*/
export const searchByAuthor = (params: any) => {
  const param = new URLSearchParams(params);
  const par = param.toString();

  return fetch(`${BASE_URL}?${par}`)
    .then((res) => res.json());
};

/*
제목 검색
params: title, type
*/
export const searchByTitle = (params: any) => {
  const param = new URLSearchParams(params);
  const par = param.toString();

  return fetch(`${BASE_URL}?${par}`)
    .then((res) => res.json());
};
