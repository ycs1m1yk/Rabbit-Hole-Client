import React from 'react';

import modalAtom from '@/recoil/modal/modalAtom';
import { useRecoilState } from 'recoil';

import Modal from '@/components/modal';
import Login from '@/pages/auth/login';

export default function useModal() {
  const getModalPage = () => {
    const [modalState, setModalState] = useRecoilState(modalAtom);
    switch (modalState) {
      case '':
        return null;
      case 'Login':
        return (
          <Modal width={480} height={500} modalHandler={() => { setModalState(''); }}>
            <Login />
          </Modal>
        );
      default:
        return null;
    }
  };
  return [getModalPage];
}
