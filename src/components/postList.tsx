// postList
import React from 'react';
import styled from 'styled-components';
import PostItem from '@components/postItem';

const Container = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  margin: 5rem;
`;

const Alignments = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4rem;
  & :hover{
    font-weight: 700;
    color: ${({ theme }) => theme.palette.eliceViolet};
  }
`;

const Alignment = styled.li`
  cursor: pointer;
  list-style-type: disc;
  font-size: 20px;
  font-weight: 500;
  line-height: 26px;
  vertical-align: middle;
  margin-left: 2rem;

  
`;

const Posts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const EmptyField = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.black};
`;

interface postInterface{
  articleId:string;
  author:string;
  title:string;
  content:string;
  date:string;
  comment:number;
  likes :number;
}

interface postList{
  posts:postInterface[]
}

export default function PostList({ posts } :postList) {
  return (
    <Container>
      <Alignments>
        <Alignment>최신순</Alignment>
        <Alignment>인기순</Alignment>
      </Alignments>
      <Posts>
        { posts.length > 0 ? posts.map((post) => (
          <PostItem
            key={post.articleId}
            profile={post.author}
            title={post.title}
            content={post.content}
            date={post.date}
            comment={post.comment}
            heart={post.likes}
          />
        )) : <EmptyField>게시물이 존재하지 않습니다.</EmptyField> }
      </Posts>
    </Container>
  );
}
