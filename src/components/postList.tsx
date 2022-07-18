/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React from 'react';
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
  gap: 1rem;
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
  width: 70rem;
  text-align: center;
  margin-top: 23rem;
  margin-bottom: 18rem;
  color: ${({ theme }) => theme.palette.black};
  opacity: 0.5;
  font-size: 4rem;
  font-weight: 700;
`;

const defaultProps = {
  type: 'default',
  title: '',
  userId: '',
};

type postList = {
  type?: string;
  title?: string;
  posts: IArticleProps[];
  userId?: string;
  sortHandler: Function | undefined;
} & typeof defaultProps

export default function PostList({
  type, title, posts, userId, sortHandler,
} : postList) {
  // 기준에 맞춰 정렬된 데이터 불러오기
  const handleClick = (sortType: string) => {
    if (typeof sortHandler === 'function') { sortHandler(sortType); }
  };

  return posts.length > 0 ? (
    <Container>
      {type === 'main' ? <Title>{title}</Title> : null}
      {type !== 'main'
        ? (
          <Alignments>
            <Alignment onClick={() => handleClick('date')}>최신순</Alignment>
            <Alignment onClick={() => handleClick('views')}>조회순</Alignment>
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
            comment={post.comments?.length || 0}
            heart={post.likes.length}
            type={type}
            articleId={post._id}
            articleType={post.articleType}
            likeThis={!!post.likes.find((el) => el.userId === userId)}
          />
        ))}
      </Posts>
    </Container>
  ) : <EmptyField>일치하는 게시글이 없습니다.</EmptyField>;
}

PostList.defaultProps = defaultProps;
