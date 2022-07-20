import React from 'react';
import styled from 'styled-components';

interface ProfileProps{
  avatar:string;
  name:string;
  track:string;
  trackCardinalNumber:number;
}
const ProfileContainer = styled.div`
  display:flex;
  align-items: center;
  height: 100%;
`;

const Avatar = styled.img`
  height: 100%;
  background-color: white;
  border-radius: 50rem;
  margin-right: 1rem;
`;

const Name = styled.p`
  font-size: large;
  font-weight: bold;
  border-bottom: 1px solid ${(props) => props.theme.palette.borderGray};
  padding: 0.5rem;
`;

const Description = styled.p`
  font-size: small;
  padding: 0.5rem;
`;
export default function Profile({
  avatar, name, track, trackCardinalNumber,
}:ProfileProps) {
  return (
    <ProfileContainer>
      <Avatar src={avatar} />
      <div>
        <Name>{name}</Name>
        <Description>{`${track} ${trackCardinalNumber} 기`}</Description>
      </div>
    </ProfileContainer>
  );
}
