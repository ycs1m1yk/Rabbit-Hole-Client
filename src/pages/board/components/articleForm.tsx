/* eslint-disable react/jsx-props-no-spreading */
import React, {
  KeyboardEvent, useCallback, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { Editor } from '@toast-ui/react-editor';
import { AiOutlineQuestionCircle, AiOutlineWarning } from 'react-icons/ai';
import { FaCarrot } from 'react-icons/fa';

import TagsInput from '@components/tagsInput';
import MarkdownEditor from '@components/markdownEditor';
import Button from '@components/button';
import SelectBox from '@components/selectBox';

import useToken from '@hooks/useToken';
import { createArticle } from '@lib/articleApi';
import modalAtom from '@recoil/modal/modalAtom';

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
    width: 14rem;
    white-space: normal;
    word-break: break-word;
    top: 2.4rem;
    right: -1rem;
    background: ${({ theme }) => theme.palette.lightViolet};

    ::after {
        content: "";
        position: absolute;
        top: -1.05rem;
        left: 11.9rem;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent ${({ theme }) => theme.palette.lightViolet} transparent;
    }
  }
  :hover span {
    display: block;

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

const boardMap: any = {
  ????????????: 'question',
  ????????????: 'free',
  ?????????: 'study',
};

function ArticleForm() {
  const editorRef = useRef<Editor>(null);
  const [tags, setTags] = useState<{name: string}[]>([]);
  const [board, setBoard] = useState<string>('????????? ??????');
  const [carrots, setCarrots] = useState<number>(0);
  const { register, handleSubmit, formState: errors } = useForm<IArticleForm>();
  const setModalState = useSetRecoilState(modalAtom);
  const { authInfo } = useToken();

  const handleEnterSubmit = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Enter') e.preventDefault();
  }, []);

  // Form ???????????? ????????? ?????? ???????????? ??????
  const onValid = useCallback((data: any) => {
    if (board === '????????? ??????') {
      alert('???????????? ??????????????????.');
      return;
    }
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
        setModalState(null);
        window.location.reload();
      }
    })();
  }, [board, tags]);

  // Form ???????????? ???????????? ?????? ?????? ???????????? ??????
  const onInvalid = useCallback(() => {
    console.log(errors);
  }, [errors]);

  return (
    <>
      <ModalHeader>
        <ModalTitle>????????? ??????</ModalTitle>
        <SelectBox options={['????????????', '????????????', '?????????']} defaultValue="????????? ??????" selectedOption={board} setSelectedOption={setBoard} width={200} type="register" />
        {board === '????????????' && (
        <SelectBoxWrapper className="selectbox-carrots">
          <CarrotsInfo>
            <FaCarrot />
            {`: ${authInfo?.carrots}???`}
          </CarrotsInfo>
          <CarrotLabel>
            ????????????
          </CarrotLabel>
          <ToolTipText>
            <span>
              ????????? ???????????? ????????? ??? ???
              ?????? ?????? ?????? ?????????!
            </span>
          </ToolTipText>
          <ToolTipIcon />
          <SelectBox options={[...Array(11).fill(0).map((v, i) => i * 10)]} defaultValue="?????? ??????" selectedOption={carrots} setSelectedOption={setCarrots} width={70} type="register" />
        </SelectBoxWrapper>
        )}
      </ModalHeader>
      <StyledArticleForm onKeyDown={handleEnterSubmit}>
        <InputWrapper>
          <InputTitle>??????</InputTitle>
          <ArticleInput
            {...register('title', {
              required: '????????? ?????????????????? :)',
              maxLength: {
                value: 100,
                message: '????????? 100??? ????????? ????????? ????????? :)',
              },
            })}
            placeholder="????????? ???????????????"
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
          <InputTitle>??????</InputTitle>
          <TagsInput tags={tags} setTags={setTags} />
        </InputWrapper>
        <InputWrapper>
          <InputTitle>??????</InputTitle>
          <MarkdownEditorWrapper>
            <MarkdownEditor ref={editorRef} />
          </MarkdownEditorWrapper>
        </InputWrapper>
        <Button className="button-post-submit" onClick={handleSubmit(onValid, onInvalid)}>????????????</Button>
      </StyledArticleForm>
    </>
  );
}

export default ArticleForm;
