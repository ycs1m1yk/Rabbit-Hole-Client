import * as interfaces from '@interfaces/interface';

// React Query의 fetcher function은 반드시 json의 Promise를 반환
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

// Article - POST 게시글 작성
export const createArticle = (token: string, bodyData: interfaces.IArticlePostProps) => fetch(`${BASE_URL}/articles`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(bodyData),
}).then((res) => res.json());

// Article - PUT 게시글 수정
export const updateArticleById = (token: string, articleId: string, bodyData: interfaces.IArticlePutProps) => fetch(`${BASE_URL}/articles/${articleId}`, {
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(bodyData),
}).then((res) => res.json());

// Article - DEL 게시글 삭제
export const deleteArticleById = (token: string, articleId: string) => fetch(`${BASE_URL}/articles/${articleId}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((res) => ({ status: res.status, data: res.json() }));

// Article - GET 게시글 조회
export const getArticleById = (articleId: string) => fetch(`${BASE_URL}/articles/${articleId}`)
  .then((res) => res.json());

export const getArticleViewById = (articleId: string) => fetch(`${BASE_URL}/articles/${articleId}/views`)
  .then((res) => res.json());

/*
전체 게시글 조회
params: articleId, filter, page, perPage
*/
// Article - GET 전체 게시글 조회
export const getAllArticle = (params: interfaces.IArticleGetProps) => {
  const param = new URLSearchParams(params);
  const par = param.toString();

  return fetch(`${BASE_URL}/articles?${par}`)
    .then((res) => res.json());
};

// 게시글 좋아요
export const increaseArticleLikes = (token: string, articleId: string) => fetch(`${BASE_URL}/articles/${articleId}/heart`, {
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((res) => res.json());
