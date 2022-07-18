import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import SideBar from '@/components/sideBar';
import useToken from '@/hooks/useToken';
import {
  AiOutlineEdit, AiOutlineUser, AiOutlineTeam, AiOutlineProject,
} from 'react-icons/ai';
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

const mypageList = [
  {
    id: 0,
    name: '개인정보 수정',
    path: '?type=profile',
    selected: true,
    icon: <AiOutlineEdit />,
  },
  {
    id: 1,
    name: '게시글 관리',
    path: '?type=articles',
    selected: false,
    icon: <AiOutlineUser />,
  },
  {
    id: 2,
    name: '멘토링 관리',
    path: '?type=mentoring',
    selected: false,
    icon: <AiOutlineTeam />,
  },
  {
    id: 3,
    name: '프로젝트 관리',
    path: '?type=projects',
    selected: false,
    icon: <AiOutlineProject />,
  },
];

function MyPage() {
  const [searchParams] = useSearchParams();
  const myPageType = searchParams.get('type');
  const { authInfo } = useToken();

  return (
    <MyPageContainer>
      <SidebarContainer>
        <SideBar type="myPage" contentsList={mypageList} />
      </SidebarContainer>
      <VerticalDivider />
      {myPageType !== null && authInfo !== null
        ? <MyPageContent type={myPageType} />
        : null}
    </MyPageContainer>
  );
}

export default MyPage;
