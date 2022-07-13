import React, { useCallback } from 'react';
import styled from 'styled-components';
import modalAtom from '@/recoil/modal/modalAtom';
import { useSetRecoilState } from 'recoil';

import SideBar from '@components/sideBar';
import Search from '@components/search';
import Button from '@components/button';
import PostList from '@components/postList';
import Pagination from '@components/pagination';
import { IArticleProps } from '@/interfaces/interface';

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

const posts: IArticleProps[] = [
  {
    _id: '1111',
    articleType: 'free',
    author: 'halley',
    authorId: 'satoly4',
    title: '안녕하세요',
    content: '반갑습니다',
    likes: [{ userId: '1234' }],
    views: 123,
    carrots: 100,
    tags: [{ name: '엘' }, { name: '리' }, { name: '스' }],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 1111,
  },
  {
    _id: '2222',
    articleType: 'free',
    author: 'halley',
    authorId: 'satoly4',
    title: '안녕하세요',
    content: '반갑습니다',
    likes: [{ userId: '1234' }],
    views: 123,
    carrots: 100,
    tags: [{ name: '엘' }, { name: '리' }, { name: '스' }],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 2222,
  },
  {
    _id: '7777',
    articleType: 'free',
    author: 'halley',
    authorId: 'satoly4',
    title: '안녕하세요',
    content: '반갑습니다',
    likes: [{ userId: '1234' }],
    views: 123,
    carrots: 100,
    tags: [{ name: '엘' }, { name: '리' }, { name: '스' }],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 7777,
  },
  {
    _id: '8888',
    articleType: 'free',
    author: 'halley',
    authorId: 'satoly4',
    title: '안녕하세요',
    content: '반갑습니다',
    likes: [{ userId: '1234' }],
    views: 123,
    carrots: 100,
    tags: [{ name: '엘' }, { name: '리' }, { name: '스' }],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 8888,
  },
  {
    _id: '3333',
    articleType: 'free',
    author: 'halley',
    authorId: 'satoly4',
    title: '안녕하세요',
    content: '반갑습니다',
    likes: [{ userId: '1234' }],
    views: 123,
    carrots: 100,
    tags: [{ name: '엘' }, { name: '리' }, { name: '스' }],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 3333,
  },
  {
    _id: '4444',
    articleType: 'free',
    author: 'halley',
    authorId: 'satoly4',
    title: '안녕하세요',
    content: '반갑습니다',
    likes: [{ userId: '1234' }],
    views: 123,
    carrots: 100,
    tags: [{ name: '엘' }, { name: '리' }, { name: '스' }],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 4444,
  },
  {
    _id: '5555',
    articleType: 'free',
    author: 'halley',
    authorId: 'satoly4',
    title: '안녕하세요',
    content: '반갑습니다',
    likes: [{ userId: '1234' }],
    views: 123,
    carrots: 100,
    tags: [{ name: '엘' }, { name: '리' }, { name: '스' }],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 5555,
  },
  {
    _id: '6666',
    articleType: 'free',
    author: 'halley',
    authorId: 'satoly4',
    title: '안녕하세요',
    content: '반갑습니다',
    likes: [{ userId: '1234' }],
    views: 123,
    carrots: 100,
    tags: [{ name: '엘' }, { name: '리' }, { name: '스' }],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 6666,
  },
];

// TODO:
/**
 * - [X] Modal 연결
 * - [ ] articleForm 작성
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
        <PostList type="default" posts={posts} />
        <Pagination handler={(num) => console.log(num)} />
      </BoardWrapper>
    </BoardContainer>
  );
}
