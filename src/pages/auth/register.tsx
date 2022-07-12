import React from 'react';
import styled from 'styled-components';
import Logo from '@/components/logo';
import Button from '@/components/button';
import { AiFillGithub } from 'react-icons/ai';
import RegisterForm from '@/components/forms/registerForm';

const Container = styled.div`
  height: 90%;
  width: 90%;
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
