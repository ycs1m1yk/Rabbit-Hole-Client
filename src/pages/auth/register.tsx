import React from 'react';
import styled from 'styled-components';
import RegisterForm from '@/components/forms/registerForm';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export default function Register() {
  return (
    <Container>
      <RegisterForm />
    </Container>
  );
}
