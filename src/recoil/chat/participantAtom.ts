import { atom } from 'recoil';
import { ParticipantProps } from './roomAtom';

const participantAtom = atom<
  {
    participantData: ParticipantProps[]
    roomName: string
  } | null>({
    key: 'participantAtom', // 해당 atom의 고유 key
    default: null, // 기본값
  });

export default participantAtom;
