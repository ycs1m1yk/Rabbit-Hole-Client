/* eslint-disable max-len */
import * as interfaces from '@interfaces/interface';

// React Query의 fetcher function은 반드시 json의 Promise를 반환
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

// User - POST 회원가입
export const postRegister = (bodyData: FormData) => fetch(`${BASE_URL}/users/register`, {
  method: 'POST',
  body: bodyData,
}).then((res) => res.json());

// User - GET 로그인
export const getUserLogin = `${BASE_URL}/auth/github/login`;

// User - DEL 회원탈퇴
export const deleteUser = (token: string) => fetch(`${BASE_URL}/users`, {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${token}` },
}).then((res) => ({ status: res.status, data: res.json() }));

// User - PUT 정보수정
export const updateUserProfile = (token: string, bodyData: interfaces.IUserPUTProps) => fetch(`${BASE_URL}/users`, {
  method: 'PUT',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: JSON.stringify(bodyData),
}).then((res) => ({ status: res.status, data: res.json() }));

// User - GET 마이페이지
export const getMyPage = (token: string) => fetch(`${BASE_URL}/users/mypage`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((res) => res.json());

// User - GET 다른 사람 정보 보기
export const getOtherPage = (token: string, githubEmail: string) => fetch(`${BASE_URL}/users/${githubEmail}`, {
  headers: { Authorization: `Bearer ${token}` },
}).then((res) => res.json());

export const getProjectByUserId = (token: string, userId: string, params: interfaces.IProjectGetParamsProps) => {
  const param = new URLSearchParams(params);
  const par = param.toString();

  return fetch(`${BASE_URL}/users/${userId}/projects?${par}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getArticleByUserId = (token: string, userId: string, params: interfaces.IArticleGetByIdProps) => {
  const param = new URLSearchParams(params);
  const par = param.toString();

  return fetch(`${BASE_URL}/users/${userId}/articles?${par}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
