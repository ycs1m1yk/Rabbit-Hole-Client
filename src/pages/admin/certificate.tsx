import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import useToken from '@/hooks/useToken';
import { approveUser } from '@/lib/adminApi';
import Button from '@/components/button';
import modalAtom from '@/recoil/modal/modalAtom';

const EmptyField = styled.p`
  text-align: center;
  margin-top: 15rem;
  margin-bottom: 18rem;
  color: ${({ theme }) => theme.palette.black};
  opacity: 0.5;
  font-size: 4rem;
  font-weight: 700;
`;

const Image = styled.img`
`;

export default function Certificate() {
  const [query] = useSearchParams();
  const { authInfo } = useToken();
  const setModal = useSetRecoilState(modalAtom);
  const image = query.get('image');
  const userId = query.get('userId');

  // guest => racer로 변경
  const clickHandler = () => {
    if (authInfo && userId) {
      try {
        approveUser(authInfo.token, userId, { role: 'racer' });
      } catch (error) {
        alert(error);
        setModal(null);
      }
      alert('등록되었습니다.');
      setModal(null);
    }
  };

  if (image && image !== 'undefined') {
    return (
      <>
        <h1>인증 이미지</h1>
        <Image src={image} />
        <Button fullSize onClick={clickHandler}>racer로 등록하기</Button>
      </>
    );
  }
  return <EmptyField>인증 이미지가 없습니다.</EmptyField>;
}
