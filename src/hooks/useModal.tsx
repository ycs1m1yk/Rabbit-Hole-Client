import React from 'react';

import modalAtom from '@/recoil/modal/modalAtom';
import { useRecoilValue } from 'recoil';

import Modal from '@/components/modal';
import Login from '@/pages/auth/login';
import ProjectForm from '@/components/forms/projectForm';
import ArticleForm from '@/pages/board/components/articleForm';
import EditProfileForm from '@/pages/myPage/components/EditProfileForm';

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
      case 'Register':
        return (
          <Modal>
            <ProjectForm />
          </Modal>
        );
      case 'Posting':
        return (
          <Modal>
            <ArticleForm />
          </Modal>
        );
      case 'ProfileImage':
        return (
          <Modal>
            <EditProfileForm />
          </Modal>
        );
      default:
        return null;
    }
  };
  return [getModalPage];
}
