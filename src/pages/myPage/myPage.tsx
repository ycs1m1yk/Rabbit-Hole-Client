import Button from '@/components/button';
import Search from '@/components/search';
import SideBar from '@/components/sideBar';
import Table from '@/components/table';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
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

const MyPageHeader = styled.div`
  margin: 5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: row;
  width: 50%;
  justify-content: space-between;
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
      {/* <MyPageHeader>
        <Button onClick={() => console.log('Click')}>선택 삭제</Button>
        <Search />
      </MyPageHeader> */}
      <MyPageContent type={myPageType && myPageType} />
    </MyPageContainer>
  );
}

export default MyPage;
