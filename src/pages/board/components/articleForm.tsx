/* eslint-disable react/jsx-props-no-spreading */
import React, {
  KeyboardEvent, useCallback, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Editor } from '@toast-ui/react-editor';
import { AiOutlineWarning } from 'react-icons/ai';
import TagsInput from '@/components/tagsInput';
import MarkdownEditor from '@/components/markdownEditor';
import Button from '@/components/button';
import SelectBox from '@components/selectBox';

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid ${(props) => props.theme.palette.borderGray};
  align-self: flex-start;
`;

const ModalTitle = styled.div`
  border: none;
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

const ErrorMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  
  & .icon-warning {
    width: 1.3rem;
    height: 1.3rem;
    color: ${({ theme }) => theme.status.warningRed};
  }
  `;

const ErrorMessage = styled.span`
  margin-left: 0.3rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.status.warningRed};
`;

const MarkdownEditorWrapper = styled.div`
  width: 60rem;
`;

interface IArticleForm {
  title: string;
  articleType: string;
  tags: {name: string}[];
  description: string;
}

function ArticleForm() {
  const editorRef = useRef<Editor>(null);
  const [tags, setTags] = useState<{name: string}[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string>('게시판 선택');
  const { register, handleSubmit, formState: errors } = useForm<IArticleForm>();

  const handleEnterSubmit = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Enter') e.preventDefault();
  }, []);

  // Form 데이터가 유효한 경우 호출되는 함수
  const onValid = useCallback((data: any) => {
    const formData: IArticleForm = {
      ...data,
      articleType: selectedBoard,
      tags,
      description: editorRef.current?.getInstance().getMarkdown(),
    };
    console.log(formData);
  }, [selectedBoard]);

  // Form 데이터가 유효하지 않은 경우 호출되는 함수
  const onInvalid = useCallback(() => {
    console.log(errors);
  }, [errors]);

  // TODO:
  /**
   * - [x] 게시판 선택 selextBox 추가
   * - [] 게시글 5000자 제한 처리
   * - [] postArticle api
   */
  return (
    <>
      <ModalHeader>
        <ModalTitle>게시글 작성</ModalTitle>
        <SelectBox options={['질문&답변', '자유주제', '스터디']} defaultValue="게시판 선택" selectedOption={selectedBoard} setSelectedOption={setSelectedBoard} width={200} type="register" />
      </ModalHeader>
      <StyledArticleForm onKeyDown={handleEnterSubmit}>
        <InputWrapper>
          <InputTitle>제목</InputTitle>
          <ArticleInput
            {...register('title', {
              required: '제목을 입력해주세요 :)',
              maxLength: {
                value: 100,
                message: '제목을 100자 이내로 입력해 주세요 :)',
              },
            })}
            placeholder="제목을 입력하세요"
          />
          {errors?.errors?.title && (
          <ErrorMessageWrapper>
            <AiOutlineWarning className="icon-warning" />
            <ErrorMessage>{errors?.errors?.title?.message}</ErrorMessage>
          </ErrorMessageWrapper>
          )}
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
