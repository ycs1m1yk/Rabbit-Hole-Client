import * as interfaces from '@interfaces/interface';

// React Query의 fetcher function은 반드시 json의 Promise를 반환
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

// Serach - GET Article - 작성자 검색
export const searchByAuthor = (params: interfaces.ISearchArticleByAuthorProps) => {
  const param = new URLSearchParams(params);
  const par = param.toString();

  return fetch(`${BASE_URL}?${par}`)
    .then((res) => res.json());
};

// Serach - GET Article - 글 제목 검색
export const searchByTitle = (params: interfaces.ISearchArticleByTitleProps) => {
  const param = new URLSearchParams(params);
  const par = param.toString();

  return fetch(`${BASE_URL}?${par}`)
    .then((res) => res.json());
};
