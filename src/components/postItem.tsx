// postItem
import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import styled from 'styled-components';

const Post = styled.div`
  cursor: pointer;
  width: 800px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  isolation: isolate;

  border-top: 1px solid ${({ theme }):string => theme.palette.borderGray};
  border-bottom: 1px solid ${({ theme }):string => theme.palette.borderGray};

  & :hover {
    opacity: 80%;
  }
`;

const Main = styled.div`
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;
`;

const Content = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const Profile = styled.p`
  font-size: 15px;
  line-height: 16px;
  letter-spacing: 1.5px;
  font-weight: 500;
  color : ${({ theme }):string => theme.palette.gray};
`;

const Title = styled.h3`
  max-width: 700px;
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 0.15px;
  color : ${({ theme }):string => theme.palette.black};

  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: nowrap;

`;

const Body = styled.p`
  max-width: 700px;
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 0.25px;
  line-height: 20px;
  color: ${({ theme }):string => theme.palette.gray};

  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: nowrap;
`;

const Date = styled.p`
  font-size: 10px;
  letter-spacing: 0.15px;
  color: ${({ theme }):string => theme.palette.gray};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

// const CommentBox = styled.div`
//   width: 60px;
//   height: 60px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   gap: 7px;
//   border-radius: 50px;
//   border: 1px solid ${({ theme }):string => theme.palette.borderGray};
// `;

// const CommentCount = styled.p`
//   font-size:  14px;
//   font-weight: 400;
//   letter-spacing: 1.25px;
//   text-align: center;
//   vertical-align: middle;
//   color: ${({ theme }):string => theme.palette.gray};
// `;

// const CommentText = styled.p`
//   font-size: 12px;
//   font-weight: 400;
//   letter-spacing: -0.75px;
//   color: ${({ theme }):string => theme.palette.gray};
// `;

const HeartBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  color: ${({ theme }):string => theme.palette.gray};
`;

const HeartCount = styled.span`
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  text-align: center;
  letter-spacing: 1.25px;

`;

interface postItem{
  profile:string;
  title:string;
  content:string;
  date:string;
  heart:number;
}

export default function PostItem({
  profile,
  title,
  content,
  date,
  heart,
}:postItem) {
  const clickHandler = ():void => {
    console.log('게시물 디테일로 이동');
  };

  return (
    <Post onClick={clickHandler}>
      <Main>
        <Content>
          <Profile>{profile}</Profile>
          <Title>{title}</Title>
          <Body>{content}</Body>
        </Content>
        <Date>{date}</Date>
      </Main>
      <Info>
        <HeartBox>
          <AiFillHeart size="20" />
          <HeartCount>{heart}</HeartCount>
        </HeartBox>
      </Info>
    </Post>
  );
}
