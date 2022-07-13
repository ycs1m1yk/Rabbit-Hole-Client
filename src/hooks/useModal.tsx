import React from 'react';

import modalAtom from '@/recoil/modal/modalAtom';
import { useRecoilValue } from 'recoil';

import Modal from '@/components/modal';
import Login from '@/pages/auth/login';

export default function useModal() {
  const getModalPage = () => {
    const modalState = useRecoilValue(modalAtom);
    switch (modalState) {
      case null:
        return null;
      case 'Login':
        return (
          <Modal width={480} height={500}>
            <Login />
          </Modal>
        );
      default:
        return null;
    }
  };
  return [getModalPage];
}
