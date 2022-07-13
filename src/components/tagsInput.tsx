/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  Dispatch, KeyboardEvent, SetStateAction, useCallback,
} from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

const TagInputContainer = styled.div`
  height: fit-content;
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 60rem;
`;

const Tag = styled.div`
    font-size: 1rem;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    gap: 0.5rem;
    height: 2rem;
    border-radius: 1rem;
    padding: 0 1rem;
    background: ${({ theme }) => theme.palette.lightViolet};
    color: white;
    margin-right: 0.75rem;
    transition: all 0.125s ease-in 0s;
    cursor: pointer;
    margin-bottom: 0.75rem;
`;

const TagInput = styled.input`
    display: inline-flex;
    width: 100%;
    margin-bottom: 0.75rem;
    border: none;
    outline: none;
    background: transparent;
    font-size: 1.125rem;
    line-height: 2rem;
    cursor: text;
`;

// eslint-disable-next-line max-len
export default function TagsInput({ tags, setTags }: {tags: string[], setTags: Dispatch<SetStateAction<string[]>>}) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    const target = e.target as HTMLInputElement;
    const { value } = target;
    if (!value.trim()) return;
    setTags((curr) => (curr.includes(value) ? curr : [...curr, value]));
    target.value = '';
  }, []);

  const removeTag = useCallback((index: number) => {
    setTags((curr) => curr.filter((el, i) => i !== index));
  }, []);

  return (
    <TagInputContainer>
      <Tags>
        { tags.map((tag, index) => (
          <Tag key={tag}>
            <span>{tag}</span>
            <AiOutlineClose onClick={() => removeTag(index)} />
          </Tag>
        )) }
      </Tags>
      <TagInput onKeyDown={handleKeyDown} type="text" placeholder="태그를 입력하세요" />
    </TagInputContainer>
  );
}
