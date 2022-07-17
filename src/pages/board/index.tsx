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

import { IArticleGetProps } from '@/interfaces/interface';
import { getAllArticle } from '@/lib/articleApi';
import useToken from '@/hooks/useToken';
import { useSearchParams } from 'react-router-dom';

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

    &[data-user-loged-in="false"] {
      right: 1rem;    
    }  
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
 * - [x] getAllAtricles로 게시글 뿌려주기
 * - [x] 최신순 추천순 정렬
 * - [x] 자신이 좋아요한 게시글 빨강하트
 * - [x] 페이지네이션 이동
 * - [] 페이지네이션 캐싱: react-query
 * - [x] 로그인 상태 조건부 랜더링
 */
export default function Board() {
  const setModalState = useSetRecoilState(modalAtom);
  const { authInfo } = useToken();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [perPage, setPerPage] = useState<number>(10);
  const [query, setQuery] = useState<IArticleGetProps>({ articleType: 'question' });

  const handleModalOpen = useCallback(() => {
    setModalState('Posting');
  }, []);

  const handleSort = (sortType: string) => {
    searchParams.set('filter', sortType);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handlePage = useCallback((idx: number) => {
    searchParams.set('page', `${idx + 1}`);
    setSearchParams(searchParams);
  }, []);

  const handlePerPage = useCallback((perPageValue: number) => {
    searchParams.set('perPage', `${perPageValue}`);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  }, []);

  const {
    isSuccess, isError, data, error,
  } = useQuery<any, Error>(
    ['articleList', query],
    () => getAllArticle(query),
    {
      staleTime: 180000,
    },
  );

  useEffect(() => {
    if (isReady) {
      searchParams.forEach((v, k) => setQuery((q) => ({ ...q, [k]: v })));
    } else {
      searchParams.set('articleType', 'question');
      searchParams.set('filter', 'date');
      searchParams.set('page', '1');
      searchParams.set('perPage', '10');
      setSearchParams(searchParams);
      setIsReady(true);
    }
  }, [searchParams]);

  if (isError) {
    return (
      <span>{`Error: ${error.message}`}</span>
    );
  }

  return isReady && isSuccess && (
    <BoardContainer>
      <SideBar type="board" />
      <BoardWrapper>
        <Search width={800} />
        <SelectBoxWrapper className="selectbox-perpage" data-user-loged-in={!!authInfo}>
          <SelectBox
            options={[5, 10, 15, 20]}
            defaultValue="페이지당 개수"
            selectedOption={perPage}
            setSelectedOption={setPerPage}
            requestFunc={handlePerPage}
            width={70}
            type="register"
          />
        </SelectBoxWrapper>
        {authInfo
      && <Button className="button-posting" size="medium" onClick={handleModalOpen}>게시글 등록</Button>}
        <PostList posts={data.articleList} sortHandler={handleSort} />
        <Pagination
          length={data.totalPage}
          start={query.page ? +(query.page) - 1 : 0}
          handler={(pageIdx) => handlePage(pageIdx)}
        />
      </BoardWrapper>
    </BoardContainer>
  );
}
