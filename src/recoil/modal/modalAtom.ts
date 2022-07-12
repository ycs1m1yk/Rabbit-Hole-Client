import { atom } from 'recoil';
import { ModalTypes } from '@/interfaces/type';

const modalAtom = atom<ModalTypes>({
  key: 'modalAtom', // 해당 atom의 고유 key
  default: null, // 기본값
});

export default modalAtom;
