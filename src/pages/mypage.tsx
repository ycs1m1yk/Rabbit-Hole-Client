import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import Modal from '../components/modal';

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  text-align: center;
`;

const DialogButton = styled.button`
  width: 10rem;
  height: 3rem;
  background-color: blueviolet;
  color: white;
  font-size: 1.2rem;
  font-weight: 400;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
  }
`;

// Modal 활용 예시
export default function Mypage() {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <Main>
      <Title>여긴 배경화면 입니다</Title>
      {isOpenModal && (
        <Modal modalHandler={onClickToggleModal} width={500} height={500}>
          Children이 들어갈 위치
        </Modal>
      )}
      <DialogButton onClick={onClickToggleModal}>Open Modal</DialogButton>
    </Main>
  );
}
