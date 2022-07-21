import * as interfaces from '@interfaces/interface';

// React Query의 fetcher function은 반드시 json의 Promise를 반환
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

// Comment - POST 댓글 작성
export const postComment = (token: string, id: string, bodyData: interfaces.IPostCommentProps) => fetch(`${BASE_URL}/comments/${id}`, {
  method: 'POST',
  body: JSON.stringify(bodyData),
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}).then((res) => res.json());

// Comment - PUT 댓글 수정
export const updateCommentById = (token: string, commentId: string, bodyData: { content: string }) => fetch(`${BASE_URL}/comments/${commentId}`, {
  method: 'PUT',
  body: JSON.stringify(bodyData),
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}).then((res) => res.json());

// Comment - DEL 댓글 삭제
export const deleteCommentById = (token: string, commentId: string) => fetch(`${BASE_URL}/comments/${commentId}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((res) => ({ status: res.status, data: res.json() }));

// Comment - POST 댓글 좋아요
export const increaseCommentLikes = (token: string, commentId: string) => fetch(`${BASE_URL}/comments/${commentId}/heart`, {
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((res) => res.json());

// Comment - POST 댓글 채택
export const adoptComment = (token: string, commentId: string) => fetch(`${BASE_URL}/comments/${commentId}/adoption`, {
  method: 'PUT',
  body: JSON.stringify({
    isAdopted: true,
  }),
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
}).then((res) => res.json());
