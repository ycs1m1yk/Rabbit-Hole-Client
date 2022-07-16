import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import SideBar from '@/components/sideBar';
import MyPageContent from './myPageContent';

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SidebarContainer = styled.div`
  margin-top: 10rem;
`;

const VerticalDivider = styled.div`
  border-left: 1px solid ${({ theme }) => theme.palette.borderGray};
  height: 100vh;
`;

function MyPage() {
  const [searchParams] = useSearchParams();
  const myPageType = searchParams.get('type');

  return (
    <MyPageContainer>
      <SidebarContainer>
        <SideBar type="myPage" />
      </SidebarContainer>
      <VerticalDivider />
      {myPageType !== null ? <MyPageContent type={myPageType} /> : null}
    </MyPageContainer>
  );
}

export default MyPage;
