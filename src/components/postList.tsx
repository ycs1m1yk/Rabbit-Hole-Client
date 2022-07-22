/* eslint-disable no-underscore-dangle */
import React, { MouseEvent, useRef } from 'react';
import styled from 'styled-components';
import PostItem from '@components/postItem';
import { IArticleProps } from '@/interfaces/interface';
import { useSearchParams } from 'react-router-dom';

const Container = styled.div`
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
  gap: 1.5rem;
`;

const Alignment = styled.li<{current: boolean}>`
  vertical-align: middle;
  margin-left: 2rem;
  list-style-type: disc;
  color: ${(props) => (props.current ? props.theme.palette.eliceViolet : props.theme.palette.gray)};
  font-size: 1.5rem;
  font-weight: ${(props) => (props.current ? '700' : '500')};
  line-height: 26px;
  cursor: pointer;

  &[selected],
  &:hover{
    font-weight: 700;
  }  
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
  sortHandler: () => {},
};

interface postList {
  type?: string;
  title?: string;
  posts: IArticleProps[];
  userId?: string;
  sortHandler?: Function;
}

export default function PostList({
  type, title, posts, userId, sortHandler,
} : postList) {
  const sortRef = useRef<HTMLLIElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get('filter');

  // 기준에 맞춰 정렬된 데이터 불러오기
  const handleClick = (e: MouseEvent<HTMLLIElement>, sortType: string) => {
    if (sortRef.current) {
      sortRef.current.removeAttribute('selected');
    }
    sortRef.current = e.target as HTMLLIElement;
    sortRef.current.setAttribute('selected', '');

    if (typeof sortHandler === 'function') { sortHandler(sortType); }
  };

  return posts.length > 0 ? (
    <Container>
      {type === 'main' ? <Title>{title}</Title> : null}
      {type !== 'main'
        ? (
          <Alignments>
            <Alignment current={currentFilter === 'date'} onClick={(e) => handleClick(e, 'date')}>최신순</Alignment>
            <Alignment current={currentFilter === 'views'} onClick={(e) => handleClick(e, 'views')}>조회순</Alignment>
          </Alignments>
        ) : null}
      <Posts>
        { posts.map((post) => (
          <PostItem
            key={post._id}
            profile={post.author}
            title={post.title}
            content={post.content}
            date={post.createdAt.slice(0, 10)}
            comment={post.comments?.length || 0}
            heart={post.likes.length}
            type={type}
            articleId={post._id}
            likeThis={!!post.likes.find((el) => el.userId === userId)}
            views={post.views}
          />
        ))}
      </Posts>
    </Container>
  ) : <EmptyField>일치하는 게시글이 없습니다.</EmptyField>;
}

PostList.defaultProps = defaultProps;
