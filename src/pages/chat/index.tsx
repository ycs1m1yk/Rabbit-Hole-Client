import React, { useCallback, useState, MouseEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import { AiOutlineMessage, AiOutlineMinus, AiOutlineArrowLeft } from 'react-icons/ai';
import { lighten } from 'polished';

const grow = keyframes`
  0% {
    width: 8rem;
    height: 8rem;
    border-radius: 50rem;
  }
  100%{
    width: 35rem;
    height: 50vh;
  }
`;

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

const ChatContaier = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 35rem;
  height: 60vh;
  position: fixed;
  font-size: 1.6rem;
  bottom:3rem;
  right:3rem;
  background-color: ${({ theme }) => lighten(0.4, theme.palette.lightViolet)};
  border-radius: 5px;
  animation:${grow} 0.1s linear 1;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 7vh;
  padding: 2rem;
  border-radius: 5px 5px 0 0;
  color: white;
  background-color: ${(props) => props.theme.palette.eliceViolet};
`;

const Profile = styled.div`
  width: 50px;
`;

const Content = styled.div`
  height: 50vh;
`;

const Sender = styled.div`
  height: 5vh;
`;

export default function Chat() {
  const [minimize, setMinimize] = useState(true);
  const minimizeHandler = useCallback((e:MouseEvent<HTMLDivElement>) => {
    setMinimize(false);
  }, []);

  const minusClickHandler = () => {
    setMinimize(true);
  };

  return (
    <Container>
      {minimize
        ? <MiniChat onClick={minimizeHandler}><AiOutlineMessage /></MiniChat>
        : (
          <ChatContaier>
            <Header>
              <Profile>gdf</Profile>
              <div style={{ fontSize: '1.8rem' }}>
                <AiOutlineArrowLeft style={{ marginRight: '1rem', cursor: 'pointer' }} />
                <AiOutlineMinus style={{ cursor: 'pointer' }} onClick={minusClickHandler} />
              </div>
            </Header>
            <Content />
            <Sender />
          </ChatContaier>
        )}
    </Container>
  );
}
