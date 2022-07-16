import { atom } from 'recoil';

export interface ChatProps {
  profile?: string, name?: string, track?: string,
  trackCardinalNumber?: number,
  chat: string
}

const chatAtom = atom<ChatProps[]>({
  key: 'chatAtom', // 해당 atom의 고유 key
  default: [], // 기본값
});

export default chatAtom;
