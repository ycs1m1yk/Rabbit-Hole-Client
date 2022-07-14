import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

import SideBar from '@components/sideBar';
import Search from '@components/search';
import SelectBox from '@components/selectBox';
import Button from '@components/button';
import PostList from '@components/postList';
import Pagination from '@components/pagination';

import modalAtom from '@/recoil/modal/modalAtom';
import { useSetRecoilState } from 'recoil';

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
    right: 11rem;
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

// TODO:
/**
 * - [x] Modal 연결
 * - [x] articleForm 작성
 * - [x] perPage selectBox 추가
 * - [] getAllAtricles로 게시글 뿌려주기
 * - [] 최신순 추천순 정렬
 * - [] 자신이 좋아요한 게시글 빨강하트
 * - [] 페이지네이션 이동
 * - [] 페이지네이션 캐싱: react-query
 */
export default function Board() {
  const [articles, setArticles] = useState<IArticleProps[]>([]);
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);
  const setModalState = useSetRecoilState(modalAtom);

  const handleModalOpen = useCallback(() => {
    setModalState('Posting');
  }, []);

  const params: IArticleGetProps = {
    articleType: 'question',
    filter: 'date',
    page: 1,
    perPage,
  };

  const { isLoading } = useQuery<any>(
    ['articleList', 'question'],
    () => getAllArticle(params),
    {
      onSuccess: (res) => {
        setArticles(res.articleList);
      },
    },
  );

  return !isLoading && (
  <BoardContainer>
    <SideBar type="board" />
    <BoardWrapper>
      <Search width={800} />
      <SelectBoxWrapper className="selectbox-perpage">
        <SelectBox options={[5, 10, 15, 20]} defaultValue="페이지당 개수" selectedOption={perPage} setSelectedOption={setPerPage} width={70} type="register" />
      </SelectBoxWrapper>
      <Button className="button-posting" size="medium" onClick={handleModalOpen}>게시글 등록</Button>
      <PostList type="default" posts={articles.slice(0, perPage)} />
      <Pagination
        length={Math.ceil(articles.length / perPage)}
        handler={setPage}
      />
    </BoardWrapper>
  </BoardContainer>
  );
}
