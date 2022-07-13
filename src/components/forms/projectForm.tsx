/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { IProjectProps } from '@/interfaces/interface';
import { postRegister } from '@/lib/userApi';
import MarkdownEditor from '../markdownEditor';
import Button from '../button';

const ModalTitle = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const ErrorMessage = styled.span`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.status.warningRed};
`;

const ProjectInfomationForm = styled.form`
  display: flex;
  flex-direction: column;
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
  width: 500px;
`;

const ProjectImageInput = styled.input`
  width: 100%;
  height: 2.5rem;
  margin: 1rem 0rem;
  border-radius: 5px;
`;

interface IForm {
  title: string;
  author: string;
  shortDescription: string;
  tags: string;
  description: string;
  thumbnail: string;
}

function ProjectForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<IForm>();

  // mutate 함수를 onSubmit 내에서 formdata를 담아 호출
  // TODO: project post API로 교체

  // const queryClient = useQueryClient();
  // const { mutate } = useMutation(postRegister, {
  //   onSuccess: (data) => {
  //     queryClient.setQueryData<IProjectProps[]>('projects', (oldData) => {
  //       if (!oldData) {
  //         return [];
  //       }
  //       console.log(data);
  //       console.log(oldData);
  //       return [...oldData, ...data];
  //     });
  //   },
  //   onError: (data) => {
  //     console.log('Error', data);
  //   },
  // });

  // Form Data가 유효하다면 이 곳에서 POST 요청
  const onValid = (data: IForm) => {
    console.log(data);
    // mutate(data);
  };

  return (
    <>
      <ModalTitle>프로젝트 등록 및 수정</ModalTitle>
      <ProjectInfomationForm>
        <InputTitle>Title</InputTitle>
        <ProjectInput {...register('title', {
          required: '제목은 필수 입력사항입니다:)',
        })}
        />
        <ErrorMessage>{errors?.title?.message}</ErrorMessage>
        <InputTitle>작성자</InputTitle>
        <ProjectInput {...register('author', {
          required: '이름은 필수 입력사항입니다:)',
        })}
        />
        <ErrorMessage>{errors?.author?.message}</ErrorMessage>
        <InputTitle>한 줄 소개</InputTitle>
        <ProjectInput {...register('shortDescription', {
          required: '한 줄 소개는 필수 입력사항입니다:)',
        })}
        />
        <ErrorMessage>{errors?.shortDescription?.message}</ErrorMessage>
        <InputTitle>Tags</InputTitle>
        <ProjectInput {...register('tags', {
          required: '태그는 필수 입력사항입니다:)',
        })}
        />
        <ErrorMessage>{errors?.tags?.message}</ErrorMessage>
        <EditorContainer style={{ marginBottom: '1rem' }}>
          <InputTitle style={{ marginBottom: '1rem' }}>Description</InputTitle>
          <MarkdownEditor />
        </EditorContainer>
        <InputTitle>Thumbnail</InputTitle>
        <ProjectImageInput
          {...register('thumbnail', {
            required: '프로젝트 사진은 필수 입력사항입니다:)',
          })}
          type="file"
        />
        <ErrorMessage>{errors?.thumbnail?.message}</ErrorMessage>
        <Button onClick={handleSubmit(onValid)}>등록하기</Button>
      </ProjectInfomationForm>
    </>
  );
}

export default ProjectForm;
