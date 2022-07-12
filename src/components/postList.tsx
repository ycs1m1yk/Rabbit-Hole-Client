/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import PostItem from '@components/postItem';
import { IArticleProps } from '@/interfaces/interface';

const Container = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  margin: 5rem;
`;

const Title = styled.div`
  font-size: 2rem;
  margin: 2rem auto;
  font-weight: bold;
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
  font-size: 1.5rem;
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

const defaultProps = {
  type: '',
};

type postList = {
  type?: string;
  posts: IArticleProps[];
} & typeof defaultProps

export default function PostList({ type, posts } : postList) {
  // 기준에 맞춰 정렬된 데이터 불러오기
  const handleSort = async (sortBy: string): Promise<any> => {
    console.log(type, sortBy);
  };

  useEffect(() => {

  }, [handleSort]);

  return (
    <Container>
      {type === 'qna' ? <Title>질의응답</Title> : type === 'free' ? <Title>자유게시판</Title> : null}
      <Alignments>
        <Alignment onClick={() => handleSort('new')}>최신순</Alignment>
        <Alignment onClick={() => handleSort('popular')}>인기순</Alignment>
      </Alignments>
      <Posts>
        { posts.length > 0 ? posts.map((post) => (
          <PostItem
            key={post.articleId}
            profile={post.author}
            title={post.title}
            content={post.content}
            date={post.createdAt}
            comment={post.comment}
            heart={post.likes}
            type={type}
            articleId={post.articleId}
            articleType={post.articleType}
          />
        )) : <EmptyField>게시물이 존재하지 않습니다.</EmptyField> }
      </Posts>
    </Container>
  );
}

PostList.defaultProps = defaultProps;
