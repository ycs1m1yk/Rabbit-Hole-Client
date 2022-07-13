import * as interfaces from '@interfaces/interface';

// React Query의 fetcher function은 반드시 json의 Promise를 반환
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

// Chat - Get 채팅 조회
export const getChattingLog = (roomType?: string) => fetch(`${BASE_URL}/cahts?room=${roomType}`).then((res) => res.json());

// 채팅 페이지네이션, 이미지 전송 및 이미지 구현 -> 추후 작성
