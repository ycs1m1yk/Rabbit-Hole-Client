import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import SideBar from '@/components/sideBar';
import useToken from '@/hooks/useToken';
import {
  AiOutlineEdit, AiOutlineUser, AiOutlineTeam, AiOutlineProject, AiOutlineLock,
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
    id: 1,
    name: '개인정보 수정',
    path: '?type=profile',
    selected: true,
    icon: <AiOutlineUser />,
  },
  {
    id: 2,
    name: '게시글 관리',
    path: '?type=articles',
    selected: false,
    icon: <AiOutlineEdit />,
  },
  {
    id: 3,
    name: '멘토링 관리',
    path: '?type=mentoring',
    selected: false,
    icon: <AiOutlineTeam />,
  },
  {
    id: 4,
    name: '프로젝트 관리',
    path: '?type=projects',
    selected: false,
    icon: <AiOutlineProject />,
  },
];

const adminPage = {
  id: 5,
  name: '관리자 모드',
  path: '/admin?type=users&role=guest&page=1&perPage=10',
  selected: false,
  icon: <AiOutlineLock />,
};

function MyPage() {
  const [searchParams] = useSearchParams();
  const myPageType = searchParams.get('type');
  const { authInfo } = useToken(); // login url에서 role 요청

  return (
    <MyPageContainer>
      <SidebarContainer>
        {/* role에 따라 동적으로 */}
        <SideBar type="myPage" contentsList={authInfo && authInfo.role === 'admin' ? [...mypageList, adminPage] : mypageList} />
      </SidebarContainer>
      <VerticalDivider />
      {myPageType !== null && authInfo !== null
        ? <MyPageContent type={myPageType} />
        : null}
    </MyPageContainer>
  );
}

export default MyPage;
