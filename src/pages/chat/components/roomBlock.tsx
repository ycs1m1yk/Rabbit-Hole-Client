import React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';

const Block = styled.div`
  width: 100%;
  padding: 0 1rem;
  margin: 1rem 0;
  border-radius: 5px;
  height: 4rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{
    background: ${(props) => lighten(0.5, props.theme.palette.eliceViolet)};
  }
`;
const Description = styled.div`
margin: 0 1rem;
`;
export default function RoomBlock(
  { roomName, participant, onClick }
  :{roomName:string, participant:number, onClick:()=>void},
) {
  return (
    <Block onClick={onClick}>
      <Description>{roomName}</Description>
      <Description>{`${participant}명`}</Description>
    </Block>
  );
}
