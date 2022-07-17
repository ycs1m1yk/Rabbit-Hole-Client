import Button from '@/components/button';
import React, { useRef } from 'react';
import styled from 'styled-components';

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

  const handleEdit = () => {
    console.log(inputRef?.current?.files[0]);
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
