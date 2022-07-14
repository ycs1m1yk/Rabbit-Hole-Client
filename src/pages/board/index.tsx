import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import SideBar from '@components/sideBar';
import Search from '@components/search';
import SelectBox from '@components/selectBox';
import Button from '@components/button';
import PostList from '@components/postList';
import Pagination from '@components/pagination';

import modalAtom from '@/recoil/modal/modalAtom';
import { useSetRecoilState } from 'recoil';

import useToken from '@/hooks/useToken';

import { IArticleGetProps, IArticleProps } from '@/interfaces/interface';
import { getAllArticle } from '@/lib/articleApi';

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

  & .selectbox-perpage {
    align-self: flex-end;
    position: absolute;
    top: 8.2rem;
    right: 10.5rem;
  }
  & .button-posting {
    align-self: flex-end;
    position: absolute;
    top: 9rem;
  }
`;

const SelectBoxWrapper = styled.div`
  & select {
    text-align: center;
    height: 3.5rem;
    border: 1.5px solid ${({ theme }) => theme.palette.borderGray}
  }
`;

const posts: IArticleProps[] = [
  {
    _id: '1110',
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
    __v: 1110,
  },
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
    _id: '9999',
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
    __v: 9999,
  },
  {
    _id: '11110',
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
    __v: 11110,
  },
  {
    _id: '11111',
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
    __v: 11111,
  },
  {
    _id: '11111',
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
    __v: 11111,
  },
  {
    _id: '12222',
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
    __v: 12222,
  },
  {
    _id: '13333',
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
    __v: 13333,
  },
  {
    _id: '14444',
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
    __v: 14444,
  },
  {
    _id: '15555',
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
    __v: 15555,
  },
  {
    _id: '16666',
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
    __v: 16666,
  },
  {
    _id: '17777',
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
    __v: 17777,
  },
  {
    _id: '18888',
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
    __v: 18888,
  },
  {
    _id: '19999',
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
    __v: 19999,
  },
];

// TODO:
/**
 * - [x] Modal 연결
 * - [x] articleForm 작성
 * - [x] useToken 훅 사용
 * - [x] perPage selectBox 추가
 * - [] getAllAtricles로 게시글 뿌려주기
 * - [] 최신순 추천순 정렬
 * - [] 자신이 좋아요한 게시글 빨강하트
 * - [] 페이지네이션 이동
 * - [] 페이지네이션 캐싱: react-query
 */
export default function Board() {
  const [articles, setArticles] = useState<IArticleProps[]>([]);
  const [perPage, setPerPage] = useState<number>(10);
  const setModalState = useSetRecoilState(modalAtom);
  const { authInfo } = useToken();

  const handleModalOpen = useCallback(() => {
    setModalState('Posting');
  }, []);

  const getArticles = useCallback(async () => {
    const params: IArticleGetProps = {
      articleType: 'question',
      filter: 'date',
      page: 1,
      perPage,
    };

    const { data } = await getAllArticle(params);
    setArticles(data);
  }, []);

  useEffect(() => {
    getArticles();
    console.log(authInfo?.userName || 'guest입니다.');
  }, []);

  return (
    <BoardContainer>
      <SideBar type="board" />
      <BoardWrapper>
        <Search width={800} />
        <SelectBoxWrapper className="selectbox-perpage">
          <SelectBox options={[5, 10, 15, 20]} defaultValue="페이지당 개수" selectedOption={perPage} setSelectedOption={setPerPage} width={70} type="register" />
        </SelectBoxWrapper>
        <Button className="button-posting" size="medium" onClick={handleModalOpen}>게시글 등록</Button>
        <PostList type="default" posts={posts.slice(0, perPage)} />
        <Pagination handler={(num) => console.log(num)} />
      </BoardWrapper>
    </BoardContainer>
  );
}
