import { atom } from 'recoil';
import { RoomProps } from './roomAtom';

const chatRoomAtom = atom<RoomProps|null>({
  key: 'chatRoomAtom', // 해당 atom의 고유 key
  default: null, // 기본값
});

export default chatRoomAtom;
