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

import modalAtom from '@recoil/modal/modalAtom';
import { useSetRecoilState } from 'recoil';

import { IArticleGetProps } from '@interfaces/interface';
import { getAllArticle } from '@lib/articleApi';
import useToken from '@hooks/useToken';

const BoardContainer = styled.div`
  min-width: 1440px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin: 3rem 0;
  margin-left: auto;
  margin-right: auto;
  padding-right: 300px;
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

export default function Board() {
  const setModalState = useSetRecoilState(modalAtom);
  const { authInfo } = useToken();
  const [searchParams, setSearchParams] = useSearchParams();

  const [perPage, setPerPage] = useState<string>('10');
  const [query, setQuery] = useState<IArticleGetProps>({
    articleType: 'question', filter: 'date', page: '1', perPage: '10',
  });

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
    setSearchParams(searchParams);
  }, []);

  const {
    isError, data, error, refetch,
  } = useQuery<any, Error>(
    ['articleList', query],
    () => getAllArticle(query),
    {
      suspense: true,
      staleTime: 180000,
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

  return (
    <BoardContainer>
      <SideBar type="board" contentsList={boardList} />
      <BoardWrapper>
        <Search articleQuery={query} />
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
