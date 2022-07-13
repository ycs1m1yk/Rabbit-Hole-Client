import React, { useCallback } from 'react';
import styled from 'styled-components';
import modalAtom from '@/recoil/modal/modalAtom';
import { useSetRecoilState } from 'recoil';

import SideBar from '@components/sideBar';
import Search from '@components/search';
import Button from '@components/button';
import PostList from '@components/postList';
import Pagination from '@components/pagination';

const BoardContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 3rem;
  padding: 0 5rem;
`;

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  & .button-posting {
    align-self: flex-end;
    position: absolute;
    top: 9rem;
  }
`;

const posts = [
  {
    articleId: '1',
    author: 'alice',
    title: 'title 1',
    content: 'content',
    date: '220711',
    comment: 12,
    likes: 102,
  },
  {
    articleId: '2',
    author: 'bob',
    title: 'title 2',
    content: 'content',
    date: '220711',
    comment: 8,
    likes: 80,
  },
  {
    articleId: '3',
    author: 'charlie',
    title: 'title 3',
    content: 'content',
    date: '220712',
    comment: 10,
    likes: 77,
  },
  {
    articleId: '1',
    author: 'alice',
    title: 'title 1',
    content: 'content',
    date: '220711',
    comment: 12,
    likes: 102,
  },
  {
    articleId: '2',
    author: 'bob',
    title: 'title 2',
    content: 'content',
    date: '220711',
    comment: 8,
    likes: 80,
  },
  {
    articleId: '3',
    author: 'charlie',
    title: 'title 3',
    content: 'content',
    date: '220712',
    comment: 10,
    likes: 77,
  },
  {
    articleId: '2',
    author: 'bob',
    title: 'title 2',
    content: 'content',
    date: '220711',
    comment: 8,
    likes: 80,
  },
  {
    articleId: '3',
    author: 'charlie',
    title: 'title 3',
    content: 'content',
    date: '220712',
    comment: 10,
    likes: 77,
  },
  {
    articleId: '2',
    author: 'bob',
    title: 'title 2',
    content: 'content',
    date: '220711',
    comment: 8,
    likes: 80,
  },
  {
    articleId: '3',
    author: 'charlie',
    title: 'title 3',
    content: 'content',
    date: '220712',
    comment: 10,
    likes: 77,
  },
];

// TODO:
/**
 * - [ ] Modal 연결: setModalState
 */
export default function Board() {
  const setModalState = useSetRecoilState(modalAtom);
  const handleModalOpen = useCallback(() => {
    setModalState('Posting');
  }, []);

  return (
    <BoardContainer>
      <SideBar type="board" />
      <BoardWrapper>
        <Search width={800} />
        <Button className="button-posting" size="medium" onClick={handleModalOpen}>게시글 등록</Button>
        <PostList posts={posts} />
        <Pagination handler={(num) => console.log(num)} />
      </BoardWrapper>
    </BoardContainer>
  );
}
