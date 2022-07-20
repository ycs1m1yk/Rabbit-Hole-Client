import React from 'react';
import styled from 'styled-components';
import Profile from './profileBlock';

const Block = styled.div<{mychat:boolean, content:boolean}>`
  width: 100%;
  height: ${({ content }) => (content ? 'auto' : '4rem')};
  display:flex;
  justify-content: ${({ mychat }) => (mychat ? 'flex-end' : 'flex-start')};
`;

const Content = styled.div<{mychat:boolean}>`
    display: flex;
    margin: 1rem 0;
    padding: 1rem;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    border: ${({ theme, mychat }) => (mychat ? 'none' : `1px solid${theme.palette.lightViolet}`)};
    color: ${({ theme, mychat }) => (mychat ? 'white' : theme.palette.gray)};
    overflow: hidden;
    word-break:break-all;
    max-width: 28rem;
    background-color: ${({ theme, mychat }) => (mychat ? theme.palette.lightViolet : 'white')};
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
    <>
      <Block content={false} mychat={mychat}>
        <Profile
          avatar={profile}
          name={name}
          track={track}
          trackCardinalNumber={trackCardinalNumber}
        />
      </Block>
      <Block mychat={mychat} content>
        <Content mychat={mychat}>{chat}</Content>
      </Block>
    </>
  );
}
