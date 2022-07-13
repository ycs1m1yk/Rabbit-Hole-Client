import React from 'react';
import styled from 'styled-components';

import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { postRegister } from '@/lib/api';
import { IProjectProps } from '@/interfaces/interface';

const Container = styled.div`

`;

function ProjectForm() {
  // const queryClient = useQueryClient();

  // // mutate 함수를 onSubmit 내에서 formdata를 담아 호출
  // const { mutate } = useMutation(postRegister, {
  //   onSuccess: (data) => {
  //     queryClient.setQueryData<IProjectProps[]>('projects', (oldData) => {
  //       if (!oldData) {
  //         return [];
  //       }
  //       return [...oldData, ...data];
  //     });
  //   },
  //   onError: (data) => {
  //     console.log('Error', data);
  //   },
  // });

  // console.log(mutate());
  return (
    <Container />
  );
}

export default ProjectForm;
