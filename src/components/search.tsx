import React, {
  Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useState,
} from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

import {
  IArticleGetProps, IProjectGetParamsProps,
} from '@interfaces/interface';
import { deletePropsFromObj, isEmptyObj } from '@utils/func';
import SelectBox from '@components/selectBox';

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
    display: flex;
    align-items: center;
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
  setInputType: null,
};

interface SearchProps {
  width?: number;
  height?: number;
  articleQuery?: IArticleGetProps | {};
  projectQuery?: IProjectGetParamsProps | {};
  setInputType?: Dispatch<SetStateAction<string>>;
}

export default function Search({
  width = 400,
  height = 45,
  articleQuery = {},
  projectQuery,
  setInputType,
}: SearchProps) {
  const inputTypeMap: {[index: string] : string} = {
    제목: 'title',
    작성자: 'author',
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedinputType, setSelectedInputType] = useState<string>('제목');
  const [input, setInput] = useState<string>('');

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    if (input === '') return;

    const query = isEmptyObj(articleQuery) ? projectQuery : articleQuery;
    const queryWithoutInput = deletePropsFromObj(query as {}, 'title', 'author');
    const queryString = new URLSearchParams({
      [inputTypeMap[selectedinputType]]: input, ...queryWithoutInput,
    });

    const to = location.pathname.includes('search') ? `?${queryString}` : `search?${queryString}`;
    navigate(to, { replace: true, state: { from: location } });
    setInput('');
  }, [input, articleQuery, projectQuery]);

  const handleChange = ({ target: { value } }: {target: HTMLInputElement}) => {
    setInput(value);
  };

  useEffect(() => {
    if (setInputType) {
      setInputType(inputTypeMap[selectedinputType]);
    }
  }, [selectedinputType]);

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
