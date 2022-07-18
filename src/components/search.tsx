/* eslint-disable consistent-return */
import React, {
  Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useState,
} from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AiOutlineSearch } from 'react-icons/ai';

import * as searchApi from '@lib/searchApi';
import {
  IArticleGetProps, IArticleProps, IProjectGetParamsProps, IProjectProps,
} from '@interfaces/interface';
import { isEmptyObj } from '@utils/func';
import useDebounce from '@/hooks/useDebounce';
import SelectBox from './selectBox';

const SearchInputContainer = styled.div<{ width: number; height: number }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;

    width: ${(props) => props.width / 10}rem;
    height: ${(props) => props.height / 10}rem;

    border: 2px solid ${({ theme }) => theme.palette.borderGray};
    border-radius: 40px;

    & .icon-search {
        width: 1.8rem;
        height: 1.7rem;
        color: ${({ theme }) => theme.palette.gray};
    }
`;

const SelectBoxWrapper = styled.div`
    margin-right: 1rem;
    & option {
      font-size: 1.2rem;
    }
`;

const SearchForm = styled.form`
    flex: 1 1 auto;
`;

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 4px;
    font-size: 1.5rem;
    font-weight: 500;
    padding-right: 1rem;
    color: ${({ theme }) => theme.palette.gray};

    &::placeholder {
        font-size: 1.5rem;
        font-weight: 500;
    }
    :focus {
        outline: none;
    }
`;

const defaultProps = {
  width: 400,
  height: 45,
  articleQuery: {},
  projectQuery: {},
};

type SearchProps = {
    width?: number;
    height?: number;
    articleQuery?: IArticleGetProps | {};
    projectQuery?: IProjectGetParamsProps | {};
    setSearchResult: Dispatch<SetStateAction<IArticleProps[] | []>>
      | Dispatch<SetStateAction<IProjectProps[] | []>>;
    setIsSearchPage: Dispatch<SetStateAction<boolean>>;
    setTotalPage: Dispatch<SetStateAction<number>>;
  } & typeof defaultProps

// TODO:
// - [x] 검색어 디바운스 적용
// - [x] 제목 / 이름 검색 옵션 selectBox 추가
// - [] 사이드바 게시판 연결
export default function Search({
  width,
  height,
  articleQuery,
  projectQuery,
  setSearchResult,
  setIsSearchPage,
  setTotalPage,
}: SearchProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedinputType, setSelectedInputType] = useState<string>('제목');
  const [inputType, setInputType] = useState<string>('title');
  const [input, setInput] = useState<string>('');
  const debouncedInput: string = useDebounce<string>(input, 300);

  const inputTypeMap: {[index: string] : string} = {
    제목: 'title',
    작성자: 'author',
  };
  useEffect(
    () => setInputType(inputTypeMap[selectedinputType]),
    [selectedinputType],
  );

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    const query = isEmptyObj(articleQuery) ? projectQuery : articleQuery;
    const queryString = new URLSearchParams({
      [inputType]: debouncedInput, ...query,
    });
    const to = location.pathname.includes('search') ? `?${queryString}` : `search?${queryString}`;
    navigate(to);
    setIsSearchPage(true);
  }, [debouncedInput, articleQuery, projectQuery]);

  const handleChange = ({ target: { value } }: {target: HTMLInputElement}) => {
    setInput(value);
  };

  useQuery<any, Error>(
    ['articleList', debouncedInput, articleQuery],
    () => {
      const query = articleQuery as IArticleGetProps;
      switch (inputType) {
        case 'title':
          return searchApi.searchArticlesByTitle({ ...query, title: debouncedInput });
        case 'author':
          return searchApi.searchArticlesByAuthor({ ...query, author: debouncedInput });

        default:
          break;
      }
    },
    {
      enabled: !isEmptyObj(articleQuery) && debouncedInput !== '',
      onSuccess: ({ articleList, totalPage }) => {
        setSearchResult(articleList);
        setTotalPage(totalPage);
      },
      onError: (err) => console.log(err),
    },
  );

  useQuery<any, Error>(
    ['articleList', debouncedInput, projectQuery],
    () => {
      const query = projectQuery as IProjectGetParamsProps;
      switch (inputType) {
        case 'title':
          return searchApi.searchProjectsByTitle({ ...query, title: debouncedInput });
        case 'author':
          return searchApi.searchProjectsByAuthor({ ...query, author: debouncedInput });

        default:
          break;
      }
    },
    {
      enabled: !isEmptyObj(projectQuery) && debouncedInput !== '',
      onSuccess: ({ articleList, totalPage }) => {
        setSearchResult(articleList);
        setTotalPage(totalPage);
      },
      onError: (err) => console.log(err),
    },
  );

  return (
    <SearchInputContainer width={width} height={height}>
      <SelectBoxWrapper>
        <SelectBox
          options={['제목', '작성자']}
          defaultValue="검색옵션"
          selectedOption={selectedinputType}
          setSelectedOption={setSelectedInputType}
          width={70}
          type="register"
        />
      </SelectBoxWrapper>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput type="search" value={input} onChange={handleChange} placeholder="Search ..." />
      </SearchForm>
      <AiOutlineSearch className="icon-search" />
    </SearchInputContainer>
  );
}

Search.defaultProps = defaultProps;
