import * as interfaces from '@interfaces/interface';

// React Query의 fetcher function은 반드시 json의 Promise를 반환
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

// Image - POST 이미지 업로드
const postImage = (bodyData: FormData) => fetch(`${BASE_URL}/images`, {
  method: 'POST',
  body: bodyData,
}).then((res) => res.json());

export default postImage;
