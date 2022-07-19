import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineMessage } from 'react-icons/ai';
import MaxChat from './maxChat';

const Container = styled.div`
  @media screen and (max-height: 40rem){
    display:none;
  }
  background-color: ${(props) => props.theme.palette.eliceViolet};
`;

const MiniChat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 8rem;
  font-size: 5rem;
  position: fixed;
  bottom:3rem;
  right:3rem;
  border-radius: 50rem;
  color: white;
  background-color: ${(props) => props.theme.palette.eliceViolet};
`;

export default function Chat() {
  const [minimize, setMinimize] = useState(true);

  const minimizeHandler = useCallback((isOpen:boolean) => {
    setMinimize(isOpen);
  }, []);

  return (
    <Container>
      {minimize
        ? <MiniChat onClick={() => minimizeHandler(false)}><AiOutlineMessage /></MiniChat>
        : <MaxChat minimizeHandler={() => minimizeHandler(true)} />}
    </Container>
  );
}
