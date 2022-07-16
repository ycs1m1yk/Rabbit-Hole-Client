import { atom, selector } from 'recoil';
import { newUserMessage } from '@/hooks/useSocket';

export interface ChatProps {
  senderId: string,
  profile: string,
  name: string,
  track: string,
  trackCardinalNumber: number,
  chat: string
}

const chatAtom = atom<Array<ChatProps | newUserMessage>>({
  key: 'chatAtom', // 해당 atom의 고유 key
  default: [], // 기본값
});

export default chatAtom;
