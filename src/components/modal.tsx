import React, { MouseEvent, PropsWithChildren, useCallback } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

import modalAtom from '@/recoil/modal/modalAtom';
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
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
`;

const DialogBox = styled.dialog<{width: number, height: number}>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
  font-size: 2rem;
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

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  backdrop-filter: blur(2px);
`;

interface IModalProps {
  width: number;
  height: number;
}

function Modal({
  width, height, children,
}: PropsWithChildren<IModalProps>) {
  const setModalState = useSetRecoilState(modalAtom);

  const handleModalClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    setModalState(null);
  }, []);
  return (
    <ModalContainer>
      <DialogBox width={width} height={height}>
        <CloseButton onClick={handleModalClick}><AiOutlineClose /></CloseButton>
        {children}
      </DialogBox>
      <Backdrop onClick={handleModalClick} />
    </ModalContainer>
  );
}

export default Modal;
