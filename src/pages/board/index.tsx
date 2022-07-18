import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import SideBar from '@components/sideBar';
import Search from '@components/search';
import SelectBox from '@components/selectBox';
import Button from '@components/button';
import PostList from '@components/postList';
import Pagination from '@components/pagination';
import Loading from '@components/loading';

import modalAtom from '@recoil/modal/modalAtom';
import { useSetRecoilState } from 'recoil';

import { IArticleGetProps, IArticleProps } from '@interfaces/interface';
import { getAllArticle } from '@lib/articleApi';
import useToken from '@hooks/useToken';

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
  & > div:first-child {
    align-self: flex-end;
  }
`;

const SelectBoxWrapper = styled.div`
  & select {
    text-align: center;
    height: 3.5rem;
    border: 1.5px solid ${({ theme }) => theme.palette.borderGray}
  }
`;

export default function Board() {
  const setModalState = useSetRecoilState(modalAtom);
  const { authInfo } = useToken();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isSearchPage, setIsSearchPage] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<string>('10');
  const [query, setQuery] = useState<IArticleGetProps>({
    articleType: 'question', filter: 'date', page: '1', perPage: '10',
  });
  const [searchResult, setSearchResult] = useState<IArticleProps[] | []>([]);

  const handleModalOpen = useCallback(() => {
    setModalState('Posting');
  }, []);

  const handleSort = useCallback((sortType: string) => {
    searchParams.set('filter', sortType);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  }, []);

  const handlePage = useCallback((idx: number) => {
    searchParams.set('page', `${idx + 1}`);
    setSearchParams(searchParams);
  }, []);

  const handlePerPage = useCallback((perPageValue: string) => {
    searchParams.set('perPage', perPageValue);
    searchParams.set('page', '1');
    setSearchParams(searchParams, { replace: true });
  }, []);

  const {
    isSuccess, isError, data, error, refetch,
  } = useQuery<any, Error>(
    ['articleList', query],
    () => getAllArticle(query),
    {
      enabled: !isSearchPage,
      staleTime: 180000,
      onSuccess: ({ totalPage: tp }) => setTotalPage(tp),
    },
  );

  useEffect(() => {
    searchParams.forEach((v, k) => setQuery((q) => ({ ...q, [k]: v })));
    refetch();
  }, [searchParams]);

  if (isError) {
    return (
      <span>{`Error: ${error.message}`}</span>
    );
  }

  return isSuccess || isSearchPage ? (
    <BoardContainer>
      <SideBar type="board" />
      <BoardWrapper>
        <Search
          articleQuery={query}
          setSearchResult={setSearchResult}
          setIsSearchPage={setIsSearchPage}
          setTotalPage={setTotalPage}
        />
        <SelectBoxWrapper className="selectbox-perpage" data-user-loged-in={!!authInfo}>
          <SelectBox
            options={['5', '10', '15', '20']}
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
        <PostList posts={isSearchPage ? searchResult : data.articleList} sortHandler={handleSort} />
        <Pagination
          length={totalPage}
          start={query.page ? +(query.page) - 1 : 0}
          handler={(pageIdx) => handlePage(pageIdx)}
        />
      </BoardWrapper>
    </BoardContainer>
  ) : <Loading />;
}
