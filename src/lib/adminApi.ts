interface IUserProps {
  [index: string]: string;
  page: string;
  perPage: string;
}
interface IArticleProps {
  [index: string]: any;
  articleType?: string;
  page?: string;
  perPage?: string;
}
interface ICommentProps {
  [index: string]: string;
  commentType: string;
  page: string;
  perPage: string;
}

// React Query의 fetcher function은 반드시 json의 Promise를 반환
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

// Admin - GET 유저 목록 조회
export const getAllUsers = (token: string, params: IUserProps) => {
  const param = new URLSearchParams(params);
  const query = param.toString();
  return fetch(`${BASE_URL}/admin/users?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json());
};

// Admin - PUT 유저 승인
export const approveUser = (token: string, userId: string, bodyData: { role: string }) => fetch(`${BASE_URL}/admin/users/${userId}`, {
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(bodyData),
}).then((res) => res.json());

// Admin - GET 게시글 목록 조회
export const getAllArticle = (token: string, params: IArticleProps) => {
  const queryString = new URLSearchParams(params);
  const param = queryString.toString();
  return fetch(`${BASE_URL}/admin/articles?${param}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json());
};

// Admin - GET 댓글 목록 조회
export const getAllComment = (token: string, params: ICommentProps) => {
  const queryString = new URLSearchParams(params);
  const param = queryString.toString();

  return fetch(`${BASE_URL}/admin/users?${param}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json());
};

// Admin - GET 프로젝트 목록 조회
export const getAllProjects = (token: string, params: IUserProps) => {
  const queryString = new URLSearchParams(params);
  const param = queryString.toString();
  return fetch(`${BASE_URL}/admin/projects?&${param}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json());
};

// Admin - DELETE 유저삭제
export const deleteUser = (token: string, userId: string) => fetch(`${BASE_URL}/admin/users/${userId}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json());

// Admin - DELETE 게시글 삭제
export const deleteArticle = (token: string, articleId: string) => fetch(`${BASE_URL}/admin/articles/${articleId}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  },
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
