import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { AuthTypes } from '@interfaces/type';

const { persistAtom } = recoilPersist({
  key: 'RabbitHoleAuth',
  storage: localStorage,
});

const authAtom = atom<AuthTypes>({
  key: 'authState', // 해당 atom의 고유 key
  default: null, // 기본값
  effects_UNSTABLE: [persistAtom],
});

export default authAtom;
