import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

interface AuthProps {
  userName: string,
  token: string,
  expire: string,
  userId: string,
  carrots: number,
}

const { persistAtom } = recoilPersist({
  key: 'RabbitHoleAuth',
  storage: localStorage,
});

const authAtom = atom<AuthProps | null>({
  key: 'authState', // 해당 atom의 고유 key
  default: null, // 기본값
  effects_UNSTABLE: [persistAtom],
});

export default authAtom;
