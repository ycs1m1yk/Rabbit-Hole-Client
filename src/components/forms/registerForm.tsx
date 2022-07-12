/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { regNumber, regPhoneNumber, regURL } from '@utils/regex/regex';

const RegisterFormContainer = styled.div``;

const ErrorMessage = styled.span`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.status.warningRed};
`;

const ModalTitle = styled.h1`
  margin-bottom: 1rem;
  text-align: center;
`;

const StyledRegisterForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const DiscordDescription = styled.div`
  font-size: 1rem;
  margin-top: 1rem;
`;

const StyledRegisterInput = styled.input`
  width: 100%;
  height: 2.5rem;
  margin: 1rem 0rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.palette.eliceViolet};
  padding-left: 0.5rem;
`;

const DiscordImageInput = styled.input`
  width: 100%;
  height: 2.5rem;
  margin: 1rem 0rem;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  width: 8rem;
  margin: 1rem auto;
  color: white;
  background-color: ${({ theme }) => theme.palette.eliceViolet};
  padding: 0.8rem;
  border-radius: 5px;
`;

interface IForm {
  name: string;
  track: string;
  trackCardinalNumber: string;
  phoneNumber: string;
  position?: string;
  blogAddress?: string;
  authImage: string;
}

function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<IForm>();

  // Form 데이터가 유효한 경우 호출되는 함수
  const onValid = (data: any) => {
    console.log('Valid', data);
  };

  // Form 데이터가 유효하지 않은 경우 호출되는 함수
  const onInvalid = (data: any) => {
    console.log(errors);
  };

  return (
    <RegisterFormContainer>
      <ModalTitle>추가 정보 입력</ModalTitle>
      <StyledRegisterForm onSubmit={handleSubmit(onValid, onInvalid)}>
        <InputTitle>이름</InputTitle>
        <StyledRegisterInput
          {...register('name', {
            required: '이름은 필수 입력사항입니다:)',
            maxLength: {
              value: 5,
              message: '이름은 5글자를 넘길 수 없습니다:)',
            },
          })}
          placeholder="ex:설재혁"
        />
        <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        <InputTitle>엘리스 트랙명</InputTitle>
        <StyledRegisterInput {...register('track', { required: '트랙명은 필수 입력사항입니다:)' })} placeholder="ex:SW Engineer" />
        <ErrorMessage>{errors?.track?.message}</ErrorMessage>
        <InputTitle>엘리스 기수</InputTitle>
        <StyledRegisterInput
          {...register('trackCardinalNumber', {
            required: '기수는 필수 입력사항입니다:)',
            pattern: {
              value: regNumber,
              message: '숫자만 입력 가능합니다:)',
            },
          })}
          placeholder="ex:2"
        />
        <ErrorMessage>{errors?.trackCardinalNumber?.message}</ErrorMessage>
        <InputTitle>전화번호</InputTitle>
        <StyledRegisterInput
          {...register('phoneNumber', {
            required: '전화번호는 필수 입력사항입니다:)',
            pattern: {
              value: regPhoneNumber,
              message: '전화번호 형식에 맞춰 입력해주세요:) Ex: 01099999999',
            },
          })}
          placeholder="ex:01012345678"
        />
        <ErrorMessage>{errors?.phoneNumber?.message}</ErrorMessage>
        <InputTitle>희망 포지션</InputTitle>
        <StyledRegisterInput {...register('position')} placeholder="ex:프론트엔드" />
        <InputTitle>블로그 주소</InputTitle>
        <StyledRegisterInput
          {...register('blogAddress', {
            pattern: {
              value: regURL,
              message: '올바른 형식의 주소를 입력해주세요:)',
            },
          })}
          placeholder="ex:https://myblog.com"
        />
        <InputTitle>Discord 인증 이미지</InputTitle>
        <DiscordDescription>본인이 속해 있는 트랙의 디스코드 채널을 캡처해서 업로드 해주세요:)</DiscordDescription>
        <DiscordImageInput {...register('authImage', { required: '인증 이미지는 필수 입력사항입니다:)' })} type="file" />
        <ErrorMessage>{errors?.authImage?.message}</ErrorMessage>
        <SubmitButton>입력 완료</SubmitButton>
      </StyledRegisterForm>
    </RegisterFormContainer>
  );
}

export default RegisterForm;
