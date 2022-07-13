import React from 'react';
import styled from 'styled-components';

import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { postRegister } from '@/lib/api';
import { IProjectProps } from '@/interfaces/interface';

const MainTitle = styled.h1`
  font-size: 2.5rem;
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
  height: 3rem;
  margin: 1rem 0rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.palette.eliceViolet};
  padding-left: 0.5rem;
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
  const {} = useForm<IForm>();
  const queryClient = useQueryClient();

  // mutate 함수를 onSubmit 내에서 formdata를 담아 호출
  const { mutate } = useMutation(postRegister, {
    onSuccess: (data) => {
      queryClient.setQueryData<IProjectProps[]>('projects', (oldData) => {
        if (!oldData) {
          return [];
        }
        return [...oldData, ...data];
      });
    },
    onError: (data) => {
      console.log('Error', data);
    },
  });

  console.log(mutate());
  return (
    <>
      <MainTitle>
        프로젝트 등록 및 수정
      </MainTitle>
      <ProjectInfomationForm>
        <InputTitle>Title</InputTitle>
        <ProjectInput />
        <InputTitle>작성자</InputTitle>
        <ProjectInput />
        <InputTitle>한 줄 소개</InputTitle>
        <ProjectInput />
        <InputTitle>Tags</InputTitle>
        <ProjectInput />
        <InputTitle>Description</InputTitle>
        <ProjectInput />
        <InputTitle>Thumbnail</InputTitle>
        <ProjectInput />
      </ProjectInfomationForm>
    </>
  );
}

export default ProjectForm;
