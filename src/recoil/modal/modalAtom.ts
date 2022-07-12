import { atom } from 'recoil';

const modalAtom = atom<'' | 'Login'>({
  key: 'modalAtom', // 해당 atom의 고유 key
  default: '', // 기본값
});

export default modalAtom;
