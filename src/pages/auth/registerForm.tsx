/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { regPhoneNumber, regURL } from '@/utils/regex';

import Button from '@components/button';
import { postRegister, getUserLogin } from '@/lib/userApi';
import { useSearchParams } from 'react-router-dom';
import { IRegisterFormProps } from '@/interfaces/interface';
import SelectBox from '../../components/selectBox';

const ErrorMessage = styled.span`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.status.warningRed};
`;

const ModalTitle = styled.h1`
  margin-bottom: 2rem;
  text-align: center;
`;

const StyledRegisterForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputTitle = styled.h3`
  font-weight: bold;
`;

const DiscordDescription = styled.p`
  font-size: 1.6rem;
  margin-top: 1rem;
`;

const StyledRegisterInput = styled.input`
  width: 100%;
  height: 3rem;
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
  const [queries] = useSearchParams();
  const { register, handleSubmit, formState: errors } = useForm<IForm>();
  const [selectedTrack, setSelectedTrack] = useState<string>('SW 엔지니어 트랙');
  const [selectedTrackNum, setSelectedTrackNum] = useState<number>(1);
  // Form 데이터가 유효한 경우 호출되는 함수
  const onValid = async (data: any) => {
    // console.log('Valid', data);
    const githubProfileUrl = queries.get('githubProfileUrl');
    const githubEmail = queries.get('githubEmail');
    const githubAvatar = queries.get('githubAvatar');

    const formData:IRegisterFormProps = {
      ...data,
      track: selectedTrack,
      trackCardinalNumber: Number(selectedTrackNum),
      githubProfileUrl,
      githubEmail,
      githubAvatar,
      authImage: data.authImage[0],
    };

    const fd: FormData = new FormData();

    for (const key in formData) {
      fd.append(key, formData[key]);
      console.log(fd.get(key));
    }

    const newUser = await postRegister(fd);
    if (newUser) {
      window.location.href = getUserLogin;
    }
  };

  // Form 데이터가 유효하지 않은 경우 호출되는 함수
  const onInvalid = () => {
    console.log(errors);
  };

  return (
    <>
      <ModalTitle>추가 정보 입력</ModalTitle>
      <h2 style={{ marginBottom: '2rem' }}>회원가입을 위해 추가정보가 필요합니다.</h2>
      <StyledRegisterForm encType="multipart/form-data">
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
        <ErrorMessage>{errors?.errors?.name?.message}</ErrorMessage>
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
              message: '전화번호 형식에 맞춰 입력해주세요:) Ex: 01099999999',
            },
          })}
          placeholder="ex:01012345678"
        />
        <ErrorMessage>{errors?.errors?.phoneNumber?.message}</ErrorMessage>
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
        <ErrorMessage>{errors?.errors?.authImage?.message}</ErrorMessage>
        <Button onClick={handleSubmit(onValid, onInvalid)}>가입 완료!</Button>
      </StyledRegisterForm>
    </>
  );
}

export default RegisterForm;
