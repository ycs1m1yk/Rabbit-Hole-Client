/* eslint-disable react/jsx-props-no-spreading */
import React, {
  KeyboardEvent, useCallback, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Editor } from '@toast-ui/react-editor';
import { AiOutlineQuestionCircle, AiOutlineWarning } from 'react-icons/ai';

import TagsInput from '@/components/tagsInput';
import MarkdownEditor from '@/components/markdownEditor';
import Button from '@/components/button';
import SelectBox from '@components/selectBox';

import useToken from '@/hooks/useToken';
import { createArticle } from '@/lib/articleApi';
import { FaCarrot } from 'react-icons/fa';

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid ${(props) => props.theme.palette.borderGray};
  align-self: flex-start;
`;

const ModalTitle = styled.h1`
  border: none;
`;

const SelectBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 12rem;
  right: 5rem;
  
  & select {
    text-align: center;
    height: 3.5rem;
    border: 1.5px solid ${({ theme }) => theme.palette.borderGray}
  }
  & div {
    height: 12rem;
    overflow: auto;
  }
`;

const CarrotsInfo = styled.span`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  position: absolute;
  top: -0.5rem;
  left: 9rem;
  z-index: 1;

  & svg {
    width: 1.3rem;
    height: 1.3rem;
    color: ${({ theme }) => theme.palette.carrotOrange};
  }
`;

const CarrotLabel = styled.span`
  font-size: 1.7rem;
`;

const ToolTipText = styled.span`
  width: 2rem;
  height: 2rem;
  margin-right: -2rem;
  color: deeppink;
  font-weight: bold;
  display: inline-block;
  position: relative;
  
  & span {
    display: none;
    position: absolute;
    max-width: 20rem;
    border: 1px solid;
    border-radius: 1rem;
    padding: 0.5rem;
    font-size: 0.8rem;
    color: white;
    background: ${({ theme }) => theme.palette.lightViolet};
  }
  :hover span {
    width: 14rem;
    white-space: normal;
    word-break: break-word;
    display: block;
    top: 2.2rem;
    right: -1rem;
    z-index: 1;

    -webkit-animation: 0.3s linear normal slide_down;
          animation: 0.3s linear normal slide_down;

    @keyframes slide_down {
      0% {
        opacity: 0.1;
      }
      100% {
        opacity: 1;
      }
    }
  }
`;

const ToolTipIcon = styled(AiOutlineQuestionCircle)`
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.palette.eliceViolet};
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
  content: string;
}

function ArticleForm() {
  const boardMap: any = {
    질문답변: 'question',
    자유주제: 'free',
    스터디: 'study',
  };
  const editorRef = useRef<Editor>(null);
  const [tags, setTags] = useState<{name: string}[]>([]);
  const [board, setBoard] = useState<string>('게시판 선택');
  const [carrots, setCarrots] = useState<number>(0);
  const { register, handleSubmit, formState: errors } = useForm<IArticleForm>();
  const { authInfo } = useToken();

  const handleEnterSubmit = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Enter') e.preventDefault();
  }, []);

  // Form 데이터가 유효한 경우 호출되는 함수
  const onValid = useCallback((data: any) => {
    const formData: IArticleForm = {
      ...data,
      articleType: boardMap[board],
      tags,
      content: editorRef.current?.getInstance().getMarkdown(),
    };
    (async () => {
      if (authInfo) {
        const { token, userName } = authInfo;
        const bodyData = { ...formData, author: userName, carrots };
        await createArticle(token, bodyData);
      }
    })();
  }, [board, tags]);

  // Form 데이터가 유효하지 않은 경우 호출되는 함수
  const onInvalid = useCallback(() => {
    console.log(errors);
  }, [errors]);

  // TODO:
  /**
   * - [x] 게시판 선택 selextBox 추가
   * - [] 게시글 5000자 제한 처리
   * - [x] postArticle api
   * - [x] 질문답변 선택하면 당근걸기
   */
  return (
    <>
      <ModalHeader>
        <ModalTitle>게시글 작성</ModalTitle>
        <SelectBox options={['질문답변', '자유주제', '스터디']} defaultValue="게시판 선택" selectedOption={board} setSelectedOption={setBoard} width={200} type="register" />
        {board === '질문답변' && (
        <SelectBoxWrapper className="selectbox-carrots">
          <CarrotsInfo>
            <FaCarrot />
            {`: ${authInfo?.carrots}개`}
          </CarrotsInfo>
          <CarrotLabel>
            당근걸기
          </CarrotLabel>
          <ToolTipText>
            <span>
              당근을 설정하면 답변을 좀 더
              빨리 받을 수도 있어요!
            </span>
          </ToolTipText>
          <ToolTipIcon />
          <SelectBox options={[...Array(11).fill(0).map((v, i) => i * 10)]} defaultValue="당근 추가" selectedOption={carrots} setSelectedOption={setCarrots} width={70} type="register" />
        </SelectBoxWrapper>
        )}
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
            autoComplete="on"
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
