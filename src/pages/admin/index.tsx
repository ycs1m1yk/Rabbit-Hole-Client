import React, { useEffect } from 'react';
import {
  AiOutlineEdit, AiOutlineUser, AiOutlineTeam, AiOutlineProject,
} from 'react-icons/ai';
import styled from 'styled-components';
import SideBar from '@/components/sideBar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useToken from '@/hooks/useToken';

import AdminUser from './user';
import AdminArticle from './articles';
import AdminProject from './project';

const AdminContainer = styled.div`
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

const Container = styled.div`
  margin: 6rem;
  width: 100%;
`;
const mypageList = [
  {
    id: 1,
    name: '유저 관리',
    path: '?type=users&role=guest&page=1&perPage=10',
    selected: true,
    icon: <AiOutlineEdit />,
  },
  {
    id: 2,
    name: '게시글 관리',
    path: '?type=articles&articleType=question&page=1&perPage=10',
    selected: false,
    icon: <AiOutlineUser />,
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
export default function Admin() {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const { authInfo } = useToken();
  const type = query.get('type');

  useEffect(() => {
    if (!authInfo) {
      alert('관리자 유저만 사용할 수 있습니다.');
      navigate('/');
    }
  }, []);

  const getPageByType = (pageType:string) => {
    switch (pageType) {
      case 'users':
        return (
          <AdminUser />
        );
      case 'articles':
        return (
          <AdminArticle />
        );
      case 'mentoring':
        return (
          <div />
        );
      case 'projects':
        return (
          <AdminProject />
        );
      default:
        return null;
    }
  };
  return (
    authInfo && (
    <AdminContainer>
      <SidebarContainer>
        <SideBar type="myPage" contentsList={mypageList} />
      </SidebarContainer>
      <VerticalDivider />
      <Container>
        {type && getPageByType(type)}
      </Container>
    </AdminContainer>
    )
  );
}
