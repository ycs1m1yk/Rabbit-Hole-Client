import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import SideBar from '@components/sideBar';
import Search from '@components/search';
import SelectBox from '@components/selectBox';
import PostList from '@components/postList';
import Pagination from '@components/pagination';

import * as searchApi from '@lib/searchApi';
import { IArticleGetProps, IArticleProps } from '@interfaces/interface';

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
    right: 1rem;
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

const boardList = [
  {
    id: 0,
    name: '질문 & 답변',
    path: '/board?articleType=question&filter=views&page=1&perPage=10',
    selected: true,
  },
  {
    id: 1,
    name: '자유게시판',
    path: '/board?articleType=free&filter=views&page=1&perPage=10',
    selected: false,
  },
  {
    id: 2,
    name: '스터디 모집',
    path: '/board?articleType=study&filter=views&page=1&perPage=10',
    selected: false,
  },
];

export default function BoardSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputType, setInputType] = useState<string>('title');
  const [perPage, setPerPage] = useState<string>('10');
  const [query, setQuery] = useState<any>({
    articleType: 'question', filter: 'date', page: '1', perPage: '10',
  });

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

  const { data, refetch } = useQuery<any, Error>(
    ['articleList', query],
    () => {
      if (inputType === 'title') {
        return searchApi.searchArticlesByTitle({ ...query });
      }
      return searchApi.searchArticlesByAuthor({ ...query });
    },
    {
      suspense: true,
      staleTime: 180000,
      onError: (err) => console.log(err),
    },
  );

  useEffect(() => {
    searchParams.forEach((v, k) => setQuery((q) => ({ ...q, [k]: v })));
    refetch();
  }, [searchParams]);

  return (
    <BoardContainer>
      <SideBar type="board" contentsList={boardList} />
      <BoardWrapper>
        <Search articleQuery={query} setInputType={setInputType} />
        <SelectBoxWrapper className="selectbox-perpage">
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
