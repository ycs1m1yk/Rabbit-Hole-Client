import React from 'react';
import styled from 'styled-components';
import NotFoundImg from '@assets/images/error-route.png';
import Button from '@components/button';
import { useNavigate } from 'react-router-dom';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.palette.lightBlue};
`;

const NotFoundCotent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;

  & .button-go-home {
    min-width: 14rem;
    height: 4rem;
    padding: 0 1.6rem;
    font-size: 1.4rem;
    font-weight: 700;
    cursor: pointer;
    
    transition: all .2s ease-in-out;
  }
`;

const NotFoundImage = styled.img`
  width: 42rem;
  height: 25rem;
`;

const NotFoundMessage = styled.p`
  line-height: 1.5;
  font-size: 1.6rem;
  font-weight: 700;
`;

export default function NotFound() {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate('/');
  };

  return (
    <NotFoundContainer>
      <NotFoundCotent>
        <NotFoundImage src={NotFoundImg} />
        <NotFoundMessage>페이지를 찾을 수 없습니다.</NotFoundMessage>
        <Button className="button-go-home" onClick={redirectToHome}>메인 페이지로 가기</Button>
      </NotFoundCotent>
    </NotFoundContainer>
  );
}
