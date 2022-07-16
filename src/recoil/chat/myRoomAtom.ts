import { atom } from 'recoil';
import { RoomProps } from './roomAtom';

const myRoomAtom = atom<RoomProps|null>({
  key: 'myRoomAtom', // 해당 atom의 고유 key
  default: null, // 기본값
});

export default myRoomAtom;
