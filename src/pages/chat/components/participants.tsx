import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ParticipantProps } from '@/recoil/chat/roomAtom';
import Button from '@/components/button';
import { lighten } from 'polished';
import Profile from './profileBlock';

const sideSlide = keyframes`
  from{
    width:0%;
  }
  to{
    width: 100%;
  }
`;

const Container = styled.div`
  position: sticky;
  bottom:0;
  right:0;
  height: 100%;
  width: 100%;
  padding: 0 2rem;
  animation:${sideSlide} 0.1s linear 1;
  background-color: ${({ theme }) => lighten(0.35, theme.palette.lightViolet)};
  overflow-y: auto;
    &::-webkit-scrollbar {
      width: 5px;
      background-color: silver;
      height: 90%;
      padding: none;
      border-radius: 5px;
    }
  &::-webkit-scrollbar-thumb {
      width:5px;
      background-color: black;
      border-radius: 2px;
    }
`;

const Enter = styled.div`
  display:flex;
  justify-content: space-around;
  margin: 1rem 0;
`;

const ProfileBlock = styled.div`
  height:5rem;
  margin: 1rem 0;
`;

export default function Participants(
  {
    participants, clean, enter, room,
  }:
  {
    participants:ParticipantProps[],
    clean:()=>void,
    enter:()=>void
    room:any
  },
) {
  return (
    <Container>
      <Enter>
        <Button size="small" onClick={clean}>접기</Button>
        {!room && <Button size="small" onClick={enter}>입장</Button>}
      </Enter>
      <h3>{participants.length ? '참가자' : '참가자 없음'}</h3>
      {participants.map(({
        avatar, name, track, trackCardinalNumber,
      }) => (
        <ProfileBlock>
          <Profile
            avatar={avatar}
            name={name}
            track={track}
            trackCardinalNumber={trackCardinalNumber}
          />
        </ProfileBlock>

      ))}

    </Container>
  );
}
