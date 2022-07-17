import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import SideBar from '@/components/sideBar';
import useToken from '@/hooks/useToken';
import MyPageContent from './myPageContainer';

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
  const { authInfo } = useToken();

  return (
    <MyPageContainer>
      <SidebarContainer>
        <SideBar type="myPage" />
      </SidebarContainer>
      <VerticalDivider />
      {myPageType !== null && authInfo !== null
        ? <MyPageContent token={authInfo.token} type={myPageType} />
        : null}
    </MyPageContainer>
  );
}

export default MyPage;
