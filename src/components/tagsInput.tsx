/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  Dispatch, KeyboardEvent, SetStateAction, useCallback, useState,
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
    width: 100%;
    height: 2.5rem;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.palette.eliceViolet};
    padding-left: 0.5rem;
`;

// eslint-disable-next-line max-len
export default function TagsInput({ tags, setTags }: {tags: {name: string}[], setTags: Dispatch<SetStateAction<{name: string}[]>>}) {
  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isComposing) return;

    if (e.key !== 'Enter') return;
    const target = e.target as HTMLInputElement;
    const { value } = target;
    if (!value.trim()) return;
    setTags((curr) => (curr.find((el) => el.name === value) ? curr : [...curr, { name: value }]));
    target.value = '';
  }, [isComposing]);

  const removeTag = useCallback((index: number) => {
    setTags((curr) => curr.filter((el, i) => i !== index));
  }, []);

  return (
    <TagInputContainer>
      <Tags>
        { tags.map((tag, index) => (
          <Tag key={tag.name}>
            <span>{tag.name}</span>
            <AiOutlineClose onClick={() => removeTag(index)} />
          </Tag>
        )) }
      </Tags>
      <TagInput
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="태그를 입력하세요"
      />
    </TagInputContainer>
  );
}
