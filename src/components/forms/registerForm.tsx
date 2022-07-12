/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { regPhoneNumber, regURL } from '@utils/regex/regex';
import SelectBox from '../selectBox';

const RegisterFormContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
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

function RegisterForm() {
  const { register, handleSubmit, formState } = useForm();
  const [selectedTrack, setSelectedTrack] = useState<string>('');
  const [selectedTrackNum, setSelectedTrackNum] = useState<number>(0);

  // Form 데이터가 유효한 경우 호출되는 함수
  const onValid = (data: any) => {
    // console.log('Valid', data);
    const formData = {
      ...data,
      track: selectedTrack,
      trackCardinalNumber: Number(selectedTrackNum),
    };
    console.log(formData);
  };

  // Form 데이터가 유효하지 않은 경우 호출되는 함수
  const onInvalid = (data: any) => {
    const errors = { ...formState.errors };
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
        <InputTitle>엘리스 트랙명</InputTitle>
        <SelectBox options={['SW', 'AI']} defaultValue="트랙명" selectedOption={selectedTrack} setSelectedOption={setSelectedTrack} width={200} type="register" />
        <InputTitle>엘리스 기수</InputTitle>
        <SelectBox options={[1, 2, 3, 4, 5]} defaultValue="기수" selectedOption={selectedTrackNum} setSelectedOption={setSelectedTrackNum} width={200} type="register" />
        <InputTitle>전화번호</InputTitle>
        <StyledRegisterInput
          {...register('phoneNumber', {
            required: '전화번호는 필수 입력사항입니다:)',
            pattern: {
              value: regPhoneNumber,
              message: '전화번호 형식에 맞춰 입력해주세요:)',
            },
          })}
          placeholder="ex:01012345678"
        />
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
        <SubmitButton>입력 완료</SubmitButton>
      </StyledRegisterForm>
    </RegisterFormContainer>
  );
}

export default RegisterForm;
