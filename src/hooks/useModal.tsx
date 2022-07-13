import React from 'react';

import modalAtom from '@/recoil/modal/modalAtom';
import { useRecoilValue } from 'recoil';

import Modal from '@/components/modal';
import Login from '@/pages/auth/login';
import ArticleForm from '@/pages/board/components/articleForm';

export default function useModal() {
  const getModalPage = () => {
    const modalState = useRecoilValue(modalAtom);
    switch (modalState) {
      case null:
        return null;
      case 'Login':
        return (
          <Modal>
            <Login />
          </Modal>
        );
      case 'Posting':
        return (
          <Modal>
            <ArticleForm />
          </Modal>
        );
      default:
        return null;
    }
  };
  return [getModalPage];
}
