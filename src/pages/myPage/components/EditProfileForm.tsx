import Button from '@/components/button';
import React, { useRef } from 'react';
import styled from 'styled-components';
import postImage from '@/lib/imageApi';
import useToken from '@/hooks/useToken';
import { useSetRecoilState } from 'recoil';
import modalAtom from '@/recoil/modal/modalAtom';

const ImageInput = styled.input`
  margin-bottom: 3rem;
`;

const PreviewConatiner = styled.div``;

const PreviewTitle = styled.h3`
  margin-bottom: 1rem;
  text-align: center;
`;

const PreviewImage = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
`;

function EditProfileForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);
  const setModal = useSetRecoilState(modalAtom);
  const { authInfo } = useToken();

  const handleEdit = async () => {
    const formData = new FormData();
    if (inputRef.current?.files) {
      const blob = inputRef.current.files[0];

      if (blob.type !== 'image/jpeg' && blob.type !== 'image/jpg' && blob.type !== 'image/gif' && blob.type !== 'image/png') {
        alert('지원하지 않는 이미지 형식입니다:(');
        return;
      }
      if (blob.size > 5242880) {
        alert('5MB 이하의 사진을 업로드해주세요:)');
        return;
      }

      formData.set('image', blob);
      const response = await postImage(authInfo!.token, formData);
      localStorage.setItem('imageUrl', response.imageUrl);
      setModal(null);
    }
  };

  // File Reader 이용하여 이미지 미리보기
  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
          previewRef.current!.src = String(reader.result);
          resolve();
      };
    });
  };

  return (
    <>
      <ImageInput onChange={(e: any) => encodeFileToBase64(e.target.files[0])} ref={inputRef} type="file" />
      <PreviewConatiner>
        <PreviewTitle>미리보기</PreviewTitle>
        <PreviewImage ref={previewRef} />
      </PreviewConatiner>
      <Button onClick={handleEdit}>변경하기</Button>
    </>
  );
}

export default EditProfileForm;
