import React from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  height: 350px;
  border: 1px solid ${({ theme }): string => theme.palette.borderGray};
  background-color: #fff;
  margin: 2rem;
  box-shadow: 4px 4px 10px ${({ theme }): string => theme.palette.borderGray};

  &:hover{
    opacity: 70%;
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

// const ProfileImg = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 50px;
// `;

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

const ImgBox = styled.div`
  width: 100%;
  height: 150px;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const ThumbnailImg = styled.img`
  width: 100%;
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 16px;
  `;

const ShortBody = styled.p`
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: 0.25px;
  text-align: left;  
  
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  color: ${({ theme }): string => theme.palette.gray};
`;
const LongBody = styled.p`
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: 0.25px;
  text-align: left;  
  
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 8;

  color: ${({ theme }): string => theme.palette.gray};
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  padding: 0px 16px;
  color: ${({ theme }): string => theme.palette.black};
`;

const LikeCount = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  padding-top: 5px;
`;

interface cardProps {
  title: string;
  author: string;
  content: string;
  thumbnail?: string;
  likes: number;
  projectId: string;
  type?: string;
}

export default function Card({
  title,
  author,
  content,
  thumbnail,
  likes,
  projectId,
  type,
}: cardProps) {
  const handleClick = ():void => {
    if (type === 'project') {
      console.log('프로젝트 디테일 페이지 이동', `/project?projectId=${projectId}`);
    }
  };

  return (
    <Container onClick={handleClick}>
      <Header>
        <HeaderText>
          <Title>{title}</Title>
          <ProfileInfo>{author}</ProfileInfo>
        </HeaderText>
      </Header>
      {
        thumbnail && (
          <ImgBox>
            <ThumbnailImg src={thumbnail} />
          </ImgBox>
        )
      }
      <Main>
        {
          thumbnail ? <ShortBody>{content}</ShortBody> : <LongBody>{content}</LongBody>
        }
      </Main>
      <Info>
        <AiOutlineLike size={35} />
        <LikeCount>{likes}</LikeCount>
      </Info>
    </Container>
  );
}
Card.defaultProps = {
  thumbnail: '',
  type: '',
};
