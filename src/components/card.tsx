import React from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  justify-content: space-between;
  gap: 5px;
  padding: 0px 16px;
  color: ${({ theme }): string => theme.palette.black};
  position: relative;
`;

const SubInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 1rem;
`;

const ViewCount = styled.span`
  font-size: 1.2rem;
`;

const CreateDate = styled.span`
  font-size: 1.2rem;
`;

const LikeContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LikeCount = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  padding-top: 5px;
`;

const TagContainer = styled.div`

`;

const Tag = styled.span`
  background-color: ${({ theme }) => theme.palette.gray};
  color: white;
  font-size: 1.2rem;
  padding: 0.8rem 1rem;
  border-radius: 5px;
  margin-left: 0.5rem;
`;

interface cardProps {
  projectId: string;
  title: string;
  author: string;
  shortDescription: string;
  description: string;
  thumbnail?: string;
  likes: number;
  tags: string[];
  date: string;
  views: string;
  type?: string;
}

export default function Card({
  projectId,
  title,
  author,
  shortDescription,
  description,
  thumbnail,
  likes,
  tags,
  date,
  views,
  type,
}: cardProps) {
  const navigate = useNavigate();

  const handleClick = ():void => {
    if (type === 'project') {
      console.log('프로젝트 디테일 페이지 이동', `/project?projectId=${projectId}`);
      navigate(`/projects?projectId=${projectId}`);
    } else if (type === 'mentoring') {
      console.log('멘토링 디테일 모달 띄우기');
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
          thumbnail ? <ShortBody>{shortDescription}</ShortBody> : <LongBody>{description}</LongBody>
        }
      </Main>
      <Info>
        <LikeContainer>
          <AiOutlineLike size={25} />
          <LikeCount>{likes}</LikeCount>
        </LikeContainer>
        <TagContainer>
          {tags.slice(0, 2).map((tag, i) => <Tag key={String(i) + tag}>{tag}</Tag>)}
        </TagContainer>
      </Info>
      <SubInfo>
        <ViewCount>
          {views}
          회
        </ViewCount>
        <CreateDate>{date}</CreateDate>
      </SubInfo>
    </Container>
  );
}
Card.defaultProps = {
  thumbnail: '',
  type: '',
};
