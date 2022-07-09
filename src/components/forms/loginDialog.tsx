import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const ModalTitle = styled.h1`
  margin-bottom: 1rem;
  text-align: center;
`;

const ModalContent = styled.div``;

function LoginDialog() {
  return (
    <Container>
      <ModalTitle>로그인</ModalTitle>
      {/* Logo Component */}
      <ModalContent>여러분들의 궁금증을 해결하세요!</ModalContent>
      {/* Button Component */}
    </Container>
  );
}

export default LoginDialog;
