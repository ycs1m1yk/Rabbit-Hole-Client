import React, { MouseEvent, PropsWithChildren } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
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

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  
`;

interface IModalProps {
  modalHandler: () => void;
  width: number;
  height: number;
}

/**
 *
 * @param {() => void} modalHandler Modal을 trigger 시키는 함수
 * @param {number} width Modal의 가로 크기
 * @param {number} height Modal의 세로 크기
 */

function Modal({
  modalHandler, width, height, children,
}: PropsWithChildren<IModalProps>) {
  const handleModalClick = (e: MouseEvent) => {
    e.preventDefault();

    if (modalHandler) {
      modalHandler();
    }
  };
  return (
    <ModalContainer>
      <DialogBox width={width} height={height}>{children}</DialogBox>
      <Backdrop onClick={handleModalClick} />
    </ModalContainer>
  );
}

export default Modal;
