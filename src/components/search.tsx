import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchInputContainer = styled.div<{ width: number; height: number }>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;

    width: ${(props) => props.width / 10}rem;
    height: ${(props) => props.height / 10}rem;

    border: 1px solid ${(props) => props.theme.palette.borderGray};
    border-radius: 40px;

    & .icon {
        width: 1.8rem;
        height: 1.7rem;
    }
`;

const SearchForm = styled.form`
    width: 100%;
`;

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 4px;
    font-size: 1.5rem;
    font-weight: 500;
    padding-right: 1rem;
    color: ${(props) => props.theme.palette.gray};

    &::placeholder {
        font-size: 1.5rem;
        font-weight: 500;
    }
    :focus {
        outline: none;
    }
`;

const defaultProps = {
  width: 300,
  height: 45,
  submitHandler: () => console.log('임시 submit 핸들러'),
};

// TODO:
// - [ ] submitHandler 좀 더 고민
type SearchProps = {
    width?: number;
    height?: number;
    submitHandler?: () => void;
  } & typeof defaultProps

export default function Search({ width, height, submitHandler }: SearchProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    submitHandler();
  };

  return (
    <SearchInputContainer width={width} height={height}>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput type="search" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search ..." />
      </SearchForm>
      <AiOutlineSearch className="icon" />
    </SearchInputContainer>
  );
}

Search.defaultProps = defaultProps;
