import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { lighten } from 'polished';
import { AiOutlineEye } from 'react-icons/ai';

const defaultProps = {
  type: '',
};

type IPostItemProps = {
  profile:string;
  title:string;
  content:string;
  date:string;
  comment:number;
  heart:number;
  articleId: string;
  articleType: string;
  type?: string;
  likeThis: boolean;
  views: number;
} & typeof defaultProps;

const Post = styled.div<{type: string}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${({ type }) => (type === 'main' ? '600px' : '800px')};
  padding: 0px 20px;
  color: ${({ theme }) => theme.palette.gray};
  isolation: isolate;

  :first-child {
    border-top: 1px solid ${({ theme }) => theme.palette.borderGray};
  }
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderGray};

  &:hover {
    opacity: 80%;
    cursor: pointer;
    background-color: ${({ theme }) => lighten(0.5, theme.palette.eliceViolet)};

    transition: all 0.3s ease-in-out;
  }
`;

const Main = styled.div<{type: string}>`
  height: ${({ type }) => (type === 'main' ? '120px' : '170px')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;
`;

const Content = styled.div<{type: string}>`
  height: ${({ type }) => (type === 'main' ? '70px' : '100px')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const Profile = styled.p<{type: string}>`
  font-size: ${({ type }) => (type === 'main' ? '12px' : '15px')};
  line-height: 16px;
  letter-spacing: 1.5px;
  font-weight: 500;
  text-overflow: ellipsis;
`;

const Title = styled.h3<{type: string}>`
  max-width:  ${({ type }) => (type === 'main' ? '33rem' : '50rem')};
  font-size: ${({ type }) => (type === 'main' ? '1.5rem' : '2rem')};
  font-weight: 700;
  letter-spacing: 0.15px;
  color : ${({ theme }) => theme.palette.black};

  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: nowrap;

`;

const Body = styled.p<{type: string}>`
  max-width:  ${({ type }) => (type === 'main' ? '43rem' : '60rem')};
  font-size: ${({ type }) => (type === 'main' ? '1.5rem' : '2rem')};
  font-weight: 300;
  letter-spacing: 0.25px;
  line-height: 20px;

  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: nowrap;
`;

const Date = styled.p`
  font-size: 10px;
  letter-spacing: 0.15px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
`;

const CommentBox = styled.div<{type: string}>`
  width: ${({ type }) => (type === 'main' ? '4.5rem' : '6rem')};
  height: ${({ type }) => (type === 'main' ? '4.5rem' : '6rem')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 7px;
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.palette.borderGray};
`;

const CommentCount = styled.p<{type:string}>`
  font-size:  ${({ type }) => (type === 'main' ? '1rem' : '1.4rem')};
  font-weight: 400;
  letter-spacing: 1.25px;
  text-align: center;
  vertical-align: middle;
`;

const CommentText = styled.p<{type:string}>`
  font-size: ${({ type }) => (type === 'main' ? '1rem' : '1.2rem')};
  font-weight: 400;
  letter-spacing: -0.75px;
`;

const InfoBox = styled.div<{type: string, likeThis: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: ${({ type }) => (type === 'main' ? '0.6rem' : '1rem')};

  font-size: ${({ type }) => (type === 'main' ? '1.1rem' : '1.4rem')};
  line-height: 16px;
  font-weight: 500;
  text-align: center;
  letter-spacing: 1.25px;
  gap: 1rem;

  & svg {
    width: ${({ type }) => (type === 'main' ? '1.5rem' : '2rem')};
    height: ${({ type }) => (type === 'main' ? '1.5rem' : '2rem')};

    :not(:first-child) {
      color: ${({ likeThis, theme }) => (likeThis ? theme.status.warningRed : theme.palette.gray)};
    }
  }
`;

const Info = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export default function PostItem({
  profile,
  title,
  content,
  date,
  comment,
  heart,
  articleId,
  articleType,
  type,
  likeThis,
  views,
}:IPostItemProps) {
  const navigate = useNavigate();
  const clickHandler = ():void => {
    navigate(`/board/detail?id=${articleId}`);
  };

  return (
    <Post type={type} onClick={clickHandler}>
      <Main type={type}>
        <Content type={type}>
          <Profile type={type}>{profile}</Profile>
          <Title type={type}>{title}</Title>
          <Body type={type}>{content}</Body>
        </Content>
        <Date>{date}</Date>
      </Main>
      <InfoContainer>
        <CommentBox type={type}>
          <CommentCount type={type}>{comment}</CommentCount>
          <CommentText type={type}>댓글</CommentText>
        </CommentBox>
        <InfoBox type={type} likeThis={likeThis}>
          <Info>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 26 26"><path fill="currentColor" d="M17.869 3.889c-2.096 0-3.887 1.494-4.871 2.524c-.984-1.03-2.771-2.524-4.866-2.524C4.521 3.889 2 6.406 2 10.009c0 3.97 3.131 6.536 6.16 9.018c1.43 1.173 2.91 2.385 4.045 3.729c.191.225.471.355.765.355h.058c.295 0 .574-.131.764-.355c1.137-1.344 2.616-2.557 4.047-3.729C20.867 16.546 24 13.98 24 10.009c0-3.603-2.521-6.12-6.131-6.12z" /></svg>
            {heart.toLocaleString()}
          </Info>
          <Info>
            <AiOutlineEye className="icon-hits" />
            {views.toLocaleString()}
          </Info>
        </InfoBox>
      </InfoContainer>
    </Post>
  );
}

PostItem.defaultProps = defaultProps;
