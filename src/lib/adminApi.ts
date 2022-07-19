/* eslint-disable max-len */
import * as interfaces from '@interfaces/interface';

interface IUserProps {
  page: string;
  perPage: string;
}

// React Query의 fetcher function은 반드시 json의 Promise를 반환
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

// Admin - GET 유저 목록 조회
export const getAllUser = (params: IUserProps | null) => {
  const param = new URLSearchParams(params);
  const query = param.toString();

  return fetch(`${BASE_URL}/admin/users?${query}`)
    .then((res) => res.json());
};

// Admin - PUT 유저 승인
export const approveUser = (token: string, userId: string) => fetch(`${BASE_URL}/admin/users/${userId}`, {
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
}).then((res) => res.json());

// Admin - GET 게시글 목록 조회
export const getAllArticle = () => {
  const [query] = useSearchParams();
  const articleType = query.get('articleType');
  const page = query.get('page');
  const perPage = query.get('perPage');

  return fetch(`${BASE_URL}/admin/articles?articleType=${articleType}&page=${page}&perPage=${perPage}`)
    .then((res) => res.json());
};

// Admin - GET 댓글 목록 조회
export const getAllComment = () => {
  const [query] = useSearchParams();
  const commentType = query.get('commentType');
  const page = query.get('page');
  const perPage = query.get('perPage');

  return fetch(`${BASE_URL}/admin/users?commentType=${commentType}&page=${page}&perPage=${perPage}`)
    .then((res) => res.json());
};

// Admin - GET 프로젝트 목록 조회
export const getAllProjects = () => {
  const [query] = useSearchParams();
  const page = query.get('page');
  const perPage = query.get('perPage');

  return fetch(`${BASE_URL}/admin/projects?&page=${page}&perPage=${perPage}`)
    .then((res) => res.json());
};

// Admin - DELETE 유저삭제
export const deleteUser = (userId: string) => fetch(`${BASE_URL}/admin/users/${userId}`, {
  method: 'DELETE',
})
  .then((res) => res.json());

// Admin - DELETE 게시글 삭제
export const deleteArticle = (articleId: string) => fetch(`${BASE_URL}/admin/articles/${articleId}`, {
  method: 'DELETE',
})
  .then((res) => res.json());

// Admin - DELETE 프로젝트 삭제
export const deleteProject = (token: string, projectId: string) => fetch(`${BASE_URL}/admin/projects/${projectId}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json());

// Admin - DELETE 댓글 삭제
export const deleteComment = (token: string, commentId: string) => fetch(`${BASE_URL}/admin/comments/${commentId}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json());
