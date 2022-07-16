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
}).then((res) => res.json());

// User - PUT 정보수정
export const updateUserProfile = (token: string, bodyData: interfaces.IRegisterFormProps) => fetch(`${BASE_URL}/users`, {
  method: 'PUT',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: JSON.stringify(bodyData),
}).then((res) => res.json());

// User - GET 마이페이지
export const getMyPage = () => fetch(`${BASE_URL}/users/mypage`).then((res) => res.json());

// User - GET 다른 사람 정보 보기
export const getOtherPage = (token: string, githubEmail: string) => fetch(`${BASE_URL}/users/${githubEmail}`, {
  headers: { Authorization: `Bearer ${token}` },
}).then((res) => res.json());
