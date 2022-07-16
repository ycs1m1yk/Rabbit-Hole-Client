import React from 'react';
import styled from 'styled-components';
import Profile from './profileBlock';

const Block = styled.div<{mychat:boolean}>`
  width: 100%;
  height: 4rem;
  display:flex;
  justify-content: ${({ mychat }) => (mychat ? 'flex-end' : 'flex-start')};
`;

const Content = styled.p`
    background-color: ${({ theme }) => theme.palette.lightViolet};
`;

const Alert = styled.p`

`;
export default function ChatBlock(
  {
    profile, name, chat, mychat, track, trackCardinalNumber,
  }:
  { profile:string,
    name:string,
    track:string,
    trackCardinalNumber:number,
    chat:string,
    mychat:boolean},
) {
  return (
    <Block mychat={mychat}>
      <Profile
        avatar={profile}
        name={name}
        track={track}
        trackCardinalNumber={trackCardinalNumber}
      />
      <Content>{chat}</Content>
    </Block>
  );
}
