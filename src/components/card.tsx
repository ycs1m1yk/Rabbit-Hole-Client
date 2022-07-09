// card
import React from 'react';
import styled from 'styled-components';
// import { AiOutlineLike } from 'react-icons/ai';

const Container = styled.div`
  width: 300px;
  height: 350px;
  border: 1px solid ${({ theme }): string => theme.palette.borderGray};
  background-color: #fff;
  margin: 2rem;

  & :hover{
    opacity: 80%;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  margin: 0 0 4px;
  padding: 14px 16px 12px;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`;

const HeaderText = styled.div`
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap:2px;
`;

const Title = styled.p`
  max-width: 200px ;
  font-size: 20px;
  font-weight:500;
  line-height: 1.2;
  letter-spacing: 0.15px;
  text-align:left;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: ${({ theme }): string => theme.palette.black};
`;

const ProfileInfo = styled.p`
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: 0.25px;
  text-align: left;
  color: ${({ theme }): string => theme.palette.gray};
`;

const ThumbnailImg = styled.img`
  width: 100%;
  height: 150px;
`;

const Main = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 16px;
  `;

const Body = styled.p`
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: 0.25px;
  text-align: left;  
  
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: 40px; 

  color: ${({ theme }): string => theme.palette.gray};
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  padding: 0px 16px;
`;

const LikeIcon = styled.svg`
  width: 35px;
  height: 35px;
  color: ${({ theme }): string => theme.palette.black};
`;
const LikeCount = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  padding-top: 5px;
  color: ${({ theme }): string => theme.palette.black};
`;

interface cardProps {
  authorImage: string;
  title: string;
  author: string;
  content: string;
  thumbnail: string;
  like: number;
}

export default function Card({
  authorImage,
  title,
  author,
  content,
  thumbnail,
  like,
}: cardProps) {
  const handleClick = ():void => {
    console.log('디테일 페이지 이동');
  };

  return (
    <Container onClick={handleClick}>
      <Header>
        <ProfileImg src={authorImage} />
        <HeaderText>
          <Title>{title}</Title>
          <ProfileInfo>{author}</ProfileInfo>
        </HeaderText>
      </Header>
      <ThumbnailImg src={thumbnail} />
      <Main>
        <Body>{content}</Body>
      </Main>
      <Info>
        <LikeIcon xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7c0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4c47.6-20.3 78.3-66.8 78.3-118.4c0-12.6-1.8-25-5.4-37c16.8-22.2 26.1-49.4 26.1-77.7c0-12.6-1.8-25-5.4-37c16.8-22.2 26.1-49.4 26.1-77.7c-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19l13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19l13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19l13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0 1 42.2-32.3c7.6 0 15.1 2.2 21.1 6.7c9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z" /></LikeIcon>
        <LikeCount>{like}</LikeCount>
      </Info>
    </Container>
  );
}
