import React from 'react';

import modalAtom from '@/recoil/modal/modalAtom';
import { useRecoilValue } from 'recoil';

import Modal from '@/components/modal';
import Login from '@/pages/auth/login';
import ProjectForm from '@/pages/projects/components/projectForm';
import ArticleForm from '@/pages/board/components/articleForm';
import EditProfileForm from '@/pages/myPage/components/EditProfileForm';
import ProjectEditForm from '@/pages/projects/components/projectEditForm';
import Certificate from '@pages/admin/certificate';
import ArticleEditForm from '@/pages/boardDetail/components/ArticleEditForm';

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
      case 'ProjectRegister':
        return (
          <Modal>
            <ProjectForm />
          </Modal>
        );
      case 'ProjectEdit':
        return (
          <Modal>
            <ProjectEditForm />
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
      case 'CertificateImage':
        return (
          <Modal>
            <Certificate />
          </Modal>
        );
      case 'ArticleEdit':
        return (
          <Modal>
            <ArticleEditForm />
          </Modal>
        );
      default:
        return null;
    }
  };
  return [getModalPage];
}
