/* eslint-disable react/jsx-props-no-spreading */
import React, { KeyboardEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Editor } from '@toast-ui/react-editor';
import TagsInput from '@/components/tagsInput';
import MarkdownEditor from '@/components/markdownEditor';
import Button from '@/components/button';

const ModalTitle = styled.h1`
  text-align: center;
`;

const StyledArticleForm = styled.form`
  display: flex;
  flex-direction: column;

  & .button-post-submit {
    align-self: flex-end;
    margin-top: 2rem;
  }
`;

const InputWrapper = styled.div`
`;

const InputTitle = styled.h2`
  margin: 1.4rem 0;
`;

const ArticleInput = styled.input`
  width: 100%;
  height: 2.5rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.palette.eliceViolet};
  padding-left: 0.5rem;
`;

const MarkdownEditorWrapper = styled.div`
  width: 60rem;
`;

function ArticleForm() {
  const editorRef = useRef<Editor>(null);
  const [tags, setTags] = useState<string[]>([]);
  const { register, handleSubmit, formState: errors } = useForm();

  const handleEnterSubmit = (e: KeyboardEvent) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  // Form 데이터가 유효한 경우 호출되는 함수
  const onValid = (data: any) => {
    const formData = {
      ...data,
      tags,
      description: editorRef.current?.getInstance().getMarkdown(),
    };
    console.log(formData);
  };

  // Form 데이터가 유효하지 않은 경우 호출되는 함수
  const onInvalid = () => {
    console.log(errors);
  };

  // TODO:
  /**
   * - [] 게시글 5000자 제한 처리
   */
  return (
    <>
      <ModalTitle>게시글 작성</ModalTitle>
      <StyledArticleForm onSubmit={handleSubmit(onValid, onInvalid)} onKeyDown={handleEnterSubmit}>
        <InputWrapper>
          <InputTitle>제목</InputTitle>
          <ArticleInput
            {...register('title', {
              required: '제목이 비어있습니다:)',
              maxLength: {
                value: 5,
                message: '제목을 100자 이내로 입력해 주세요:)',
              },
            })}
            placeholder="제목을 입력하세요"
          />
        </InputWrapper>
        <InputWrapper>
          <InputTitle>태그</InputTitle>
          <TagsInput tags={tags} setTags={setTags} />
        </InputWrapper>
        <InputWrapper>
          <InputTitle>본문</InputTitle>
          <MarkdownEditorWrapper>
            <MarkdownEditor ref={editorRef} />
          </MarkdownEditorWrapper>
        </InputWrapper>
        <Button className="button-post-submit" onClick={handleSubmit(onValid, onInvalid)}>등록하기</Button>
      </StyledArticleForm>
    </>
  );
}

export default ArticleForm;
