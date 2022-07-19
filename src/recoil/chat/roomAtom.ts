import { atom } from 'recoil';

export interface ParticipantProps {
  name: string,
  track: string,
  trackCardinalNumber: number,
  avatar: string
}
export interface RoomProps {
  roomName: string,
  participants: ParticipantProps[],
}

const roomAtom = atom<RoomProps[]>({
  key: 'roomAtom', // 해당 atom의 고유 key
  default: [], // 기본값
});

export default roomAtom;
