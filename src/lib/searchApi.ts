import * as interfaces from '@interfaces/interface';

// React Query의 fetcher function은 반드시 json의 Promise를 반환
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

// Serach - GET Article - 글 제목 검색
export const searchArticlesByTitle = (params: interfaces.ISearchArticlesByTitleProps) => {
  const param = new URLSearchParams(params);
  const par = param.toString();

  return fetch(`${BASE_URL}/search/articles?${par}`)
    .then((res) => res.json());
};

// Serach - GET Article - 작성자 아이디 검색
export const searchArticlesByUserId = (params: interfaces.ISearchArticlesByUserIdProps) => {
  const param = new URLSearchParams(params);
  const par = param.toString();

  return fetch(`${BASE_URL}/search/articles?${par}`)
    .then((res) => res.json());
};

// Serach - GET Article - 작성자 검색
export const searchArticlesByAuthor = (params: interfaces.ISearchArticlesByAuthorProps) => {
  const param = new URLSearchParams(params);
  const par = param.toString();

  return fetch(`${BASE_URL}/search/articles?${par}`)
    .then((res) => res.json());
};

// Serach - GET Project - 글 제목 검색
export const searchProjectsByTitle = (params: interfaces.ISearchProjectsByTitleProps) => {
  const param = new URLSearchParams(params);
  const par = param.toString();

  return fetch(`${BASE_URL}/search/projects?${par}`)
    .then((res) => res.json());
};

// Serach - GET Project - 작성자 아이디 검색
export const searchProjectsByUserId = (params: interfaces.ISearchProjectsByUserIdProps) => {
  const param = new URLSearchParams(params);
  const par = param.toString();

  return fetch(`${BASE_URL}/search/projects?${par}`)
    .then((res) => res.json());
};

// Serach - GET Project - 작성자 검색
export const searchProjectsByAuthor = (params: interfaces.ISearchProjectsByAuthorProps) => {
  const param = new URLSearchParams(params);
  const par = param.toString();

  return fetch(`${BASE_URL}/search/projects?${par}`)
    .then((res) => res.json());
};
