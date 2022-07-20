import React, { MouseEvent, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

import modalAtom from '@recoil/modal/modalAtom';
import { useSetRecoilState } from 'recoil';

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 60;
  transform: translate(-50%, -50%);
`;

const DialogBox = styled.dialog`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  height: fit-content;
  max-height: 90vh;
  padding: 2rem 4rem;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  font-size: 2rem;
  white-space: nowrap;
  overflow: auto;
  position: relative;
  z-index: 10000;
`;

const CloseButton = styled.button`
  position: relative;
  top: -1%;
  right: -49%;
  border: none;
  background-color: inherit;
  font-size: 2rem;
  cursor: pointer;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin-bottom: 6rem;
  }
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  backdrop-filter: blur(2px);
`;

function Modal({
  children,
}: {children: React.ReactNode }) {
  const setModalState = useSetRecoilState(modalAtom);

  const handleModalClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    setModalState(null);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <ModalContainer>
      <DialogBox>
        <CloseButton onClick={handleModalClick}><AiOutlineClose /></CloseButton>
        <FormContainer>{children}</FormContainer>
      </DialogBox>
      <Backdrop onClick={handleModalClick} />
    </ModalContainer>
  );
}

export default Modal;
