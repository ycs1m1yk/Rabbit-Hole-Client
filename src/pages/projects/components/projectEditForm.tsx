/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useCallback, useState, KeyboardEvent, useRef, useEffect,
} from 'react';
import styled from 'styled-components';

import { useForm } from 'react-hook-form';
import { Editor } from '@toast-ui/react-editor';
import { getProjectById, updateProjectById } from '@/lib/projectApi';

import useToken from '@/hooks/useToken';
import modalAtom from '@/recoil/modal/modalAtom';
import { useSetRecoilState } from 'recoil';
import { useSearchParams } from 'react-router-dom';
import { IProjectPostParamsProps, IProjectProps } from '@/interfaces/interface';
import MarkdownEditor from '../../../components/markdownEditor';
import Button from '../../../components/button';
import TagsInput from '../../../components/tagsInput';

const ModalTitle = styled.h1`
  text-align: center;
`;

const ErrorMessage = styled.span`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.status.warningRed};
`;

const ProjectInfomationForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const TagContainer = styled.div`
  margin: 1rem 0;
`;

const InputTitle = styled.h3`
  font-weight: bold;
`;

const ProjectInput = styled.input`
  width: 100%;
  height: 2rem;
  margin: 1rem 0rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.palette.eliceViolet};
  padding-left: 0.5rem;
`;

const EditorContainer = styled.div`
  width: 60rem;
`;

const ProjectImageInput = styled.input`
  width: 100%;
  height: 2.5rem;
  margin: 1rem 0rem;
  border-radius: 5px;
`;

interface IForm extends IProjectPostParamsProps {
  tags: any;
}

function ProjectEditForm() {
  const [prevData, setPrevData] = useState<IProjectProps>(); // 기존 정보
  const [tags, setTags] = useState<{name: string}[]>([]);
  const setModal = useSetRecoilState(modalAtom);
  const editorRef = useRef<Editor>(null);
  const { authInfo } = useToken();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId');
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<IForm>();

  // Tag 입력하고 Enter 시 Form Submit 방지
  const handleEnterSubmit = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Enter') e.preventDefault();
  }, []);

  // Form Data PUT 요청
  const onValid = async (data: IForm) => {
    const formData: IForm = {
      ...data,
      thumbnail: data.thumbnail[0],
      description: editorRef.current?.getInstance().getMarkdown(),
      tags: JSON.stringify(tags),
    };

    if (data.author === '') {
      formData.author = prevData!.author;
    }
    if (data.title === '') {
      formData.title = prevData!.title;
    }
    if (data.shortDescription === '') {
      formData.shortDescription = prevData!.shortDescription;
    }

    const fd: any = new FormData();

    for (const key in formData) {
      fd.append(key, formData[key]);
    }

    if (authInfo?.token) {
      const response = await updateProjectById(authInfo.token, projectId as string, fd);

      if (response.status >= 400) {
        const resp = await response.data;
        alert(resp.reason);
      }
      setModal(null);
    }

    window.location.reload();
  };

  const getPrevFormData = async (PID: string) => {
    const response = await getProjectById(PID);
    const data = { ...response.projectInfo };
    setTags(data.tags);
    setPrevData(data);
  };

  useEffect(() => {
    if (projectId) {
      getPrevFormData(projectId);
    }
  }, []);

  return (
    <>
      <ModalTitle>프로젝트 수정</ModalTitle>
      <ProjectInfomationForm encType="multipart/form-data" onKeyDown={handleEnterSubmit}>
        <InputTitle>Title</InputTitle>
        <ProjectInput
          defaultValue={prevData?.title}
          {...register('title', {
            maxLength: {
              value: 50,
              message: '제목은 50자 이내로 입력해주세요',
            },
          })}
        />
        <ErrorMessage>{errors?.title?.message}</ErrorMessage>
        <InputTitle>작성자 또는 팀명</InputTitle>
        <ProjectInput
          defaultValue={prevData?.author}
          {...register('author', {
            maxLength: {
              value: 50,
              message: '작성자 또는 팀명은 50자 이내로 입력해주세요',
            },
          })}
        />
        <ErrorMessage>{errors?.author?.message}</ErrorMessage>
        <InputTitle>한 줄 소개</InputTitle>
        <ProjectInput
          defaultValue={prevData?.shortDescription}
          {...register('shortDescription', {
            maxLength: {
              value: 50,
              message: '한 줄 소개는 50자 이내로 입력해주세요',
            },
          })}
        />
        <ErrorMessage>{errors?.shortDescription?.message}</ErrorMessage>
        <InputTitle>태그</InputTitle>
        <TagContainer>
          <TagsInput tags={tags} setTags={setTags} />
        </TagContainer>
        <EditorContainer style={{ marginBottom: '1rem' }}>
          <InputTitle style={{ marginBottom: '1rem' }}>본문</InputTitle>
          <MarkdownEditor initialValue={prevData?.description} ref={editorRef} />
        </EditorContainer>
        <InputTitle style={{ margin: '1rem 0' }}>프로젝트 이미지</InputTitle>
        <ProjectImageInput
          {...register('thumbnail')}
          type="file"
        />
        <ErrorMessage>{errors?.thumbnail?.message}</ErrorMessage>
        <Button fullSize onClick={handleSubmit(onValid)}>등록하기</Button>
      </ProjectInfomationForm>
    </>
  );
}

export default ProjectEditForm;
