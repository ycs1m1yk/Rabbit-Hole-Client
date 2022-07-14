/* eslint-disable no-underscore-dangle */
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
  margin: 5rem 0;
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
  type: 'default',
  title: '',
};

type postList = {
  type?: string;
  title?: string;
  posts: IArticleProps[];
} & typeof defaultProps

export default function PostList({ type, title, posts } : postList) {
  // 기준에 맞춰 정렬된 데이터 불러오기
  const handleSort = async (sortBy: string): Promise<any> => {
    console.log(type, sortBy);
  };

  useEffect(() => {

  }, [handleSort]);

  return (
    <Container>
      {type === 'main' ? <Title>{title}</Title> : null}
      {type !== 'main'
        ? (
          <Alignments>
            <Alignment onClick={() => handleSort('new')}>최신순</Alignment>
            <Alignment onClick={() => handleSort('popular')}>인기순</Alignment>
          </Alignments>
        ) : null}
      <Posts>
        { posts.map((post) => (
          <PostItem
            key={post._id}
            profile={post.author}
            title={post.title}
            content={post.content}
            date={post.createdAt}
            comment={123}
            heart={post.likes.length}
            type={type}
            articleId={post._id}
            articleType={post.articleType}
          />
        ))}
      </Posts>
    </Container>
  );
}

PostList.defaultProps = defaultProps;
