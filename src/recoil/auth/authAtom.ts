import { atom } from 'recoil';

const authState = atom({
  key: 'authState', // 해당 atom의 고유 key
  default: '', // 기본값
});

export default authState;
