/* eslint-disable react/jsx-props-no-spreading */
import React, {
  KeyboardEvent, useCallback, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { Editor } from '@toast-ui/react-editor';
import { AiOutlineWarning } from 'react-icons/ai';
import TagsInput from '@components/tagsInput';
import MarkdownEditor from '@components/markdownEditor';
import Button from '@components/button';
import useToken from '@hooks/useToken';
import { getArticleById, updateArticleById } from '@lib/articleApi';
import modalAtom from '@recoil/modal/modalAtom';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

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
  tags: {name: string}[];
  content: string;
}

export default function ArticleEditForm() {
  const editorRef = useRef<Editor>(null);
  const [tags, setTags] = useState<{name: string}[]>([]);
  const { register, handleSubmit, formState: errors } = useForm<IArticleForm>();
  const setModalState = useSetRecoilState(modalAtom);
  const { authInfo } = useToken();
  const [query] = useSearchParams();
  const articleId = query.get('id');

  const { data } = useQuery<any>(['boardDetail', articleId], () => getArticleById(articleId!), {
    enabled: !!articleId,
    select: (fetchData) => ({ article: fetchData.articleInfo }),
    onSuccess: (fetchData) => {
      setTags(fetchData.article.tags);
    },
  });

  const handleEnterSubmit = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Enter') e.preventDefault();
  }, []);

  // Form ???????????? ????????? ?????? ???????????? ??????
  const onValid = useCallback((datas: any) => {
    const formData: IArticleForm = {
      ...datas,
      tags,
      content: editorRef.current?.getInstance().getMarkdown(),
    };
    (async () => {
      if (authInfo) {
        const { token } = authInfo;
        const bodyData = { ...formData };
        await updateArticleById(token, articleId as string, bodyData);
        setModalState(null);
        window.location.reload();
      }
    })();
  }, [tags]);

  return (
    <>
      <ModalHeader>
        <ModalTitle>????????? ??????</ModalTitle>
      </ModalHeader>
      <StyledArticleForm onKeyDown={handleEnterSubmit}>
        <InputWrapper>
          <InputTitle>??????</InputTitle>
          <ArticleInput
            defaultValue={data.article?.title}
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
            <MarkdownEditor initialValue={data.article?.content} ref={editorRef} />
          </MarkdownEditorWrapper>
        </InputWrapper>
        <Button className="button-post-submit" onClick={handleSubmit(onValid)}>????????????</Button>
      </StyledArticleForm>
    </>
  );
}
