import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const RegisterFormContainer = styled.div``;

const ModalTitle = styled.h1`
  margin-bottom: 1rem;
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
  border: 1px solid ${(props) => props.theme.palette.eliceViolet};
`;

const SubmitButton = styled.button`
  width: 8rem;
  margin: 1rem auto;
  color: white;
  background-color: ${(props) => props.theme.palette.eliceViolet};
  padding: 0.8rem;
  border-radius: 5px;
`;

function RegisterForm() {
  const { register, handleSubmit } = useForm();

  // Form 데이터가 유효한 경우 호출되는 함수
  const onValid = (data: any) => {
    console.log('Valid', data);
  };

  // Form 데이터가 유효하지 않은 경우 호출되는 함수
  const onInvalid = (data: any) => {
    console.log('Invalid', data);
  };

  return (
    <RegisterFormContainer>
      <ModalTitle>추가 정보 입력</ModalTitle>
      <StyledRegisterForm onSubmit={handleSubmit(onValid, onInvalid)}>
        <InputTitle>이름</InputTitle>
        <StyledRegisterInput {...register('name', { required: true })} placeholder="ex:설재혁" />
        <InputTitle>엘리스 트랙명</InputTitle>
        <StyledRegisterInput {...register('track', { required: true })} placeholder="ex:SW Engineer" />
        <InputTitle>엘리스 기수</InputTitle>
        <StyledRegisterInput {...register('trackCardinalNumber', { required: true })} placeholder="ex:2기" />
        <InputTitle>전화번호</InputTitle>
        <StyledRegisterInput {...register('phoneNumber', { required: true })} placeholder="ex:010-1234-5678" />
        <InputTitle>희망 포지션</InputTitle>
        <StyledRegisterInput {...register('position')} placeholder="ex:프론트엔드" />
        <InputTitle>블로그 주소</InputTitle>
        <StyledRegisterInput {...register('blogAddress')} placeholder="ex:https://myblog.com" />
        <InputTitle>Discord 인증 이미지</InputTitle>
        <DiscordDescription>본인이 속해 있는 트랙의 디스코드 채널을 캡처해서 업로드 해주세요:)</DiscordDescription>
        <StyledRegisterInput {...register('authImage', { required: true })} type="file" />
        <SubmitButton>입력 완료</SubmitButton>
      </StyledRegisterForm>
    </RegisterFormContainer>
  );
}

export default RegisterForm;
