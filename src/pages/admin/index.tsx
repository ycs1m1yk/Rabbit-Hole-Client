import React, { useEffect } from 'react';
import {
  AiOutlineEdit, AiOutlineUser, AiOutlineTeam, AiOutlineProject,
} from 'react-icons/ai';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SideBar from '@/components/sideBar';
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
    path: '/',
    selected: false,
    icon: <AiOutlineTeam />,
  },
  {
    id: 4,
    name: '프로젝트 관리',
    path: '?type=projects&page=1&perPage=10',
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
    if (authInfo?.role !== 'admin') {
      alert('정석으로 갈까요 뒤집어볼까요 꺼지세요 말고 약간 이런거보다는 약간 들어가면은 약간 개발자느낌 뭔지알지 들어가면....들어가면 AWS과금 500만원 이렇게쓸까요? 이렇게들어가면 재밌긴하겠다 들어가면 뭐못한다고요? 취업못함 ㅇㅋ');
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
    authInfo?.role === 'admin' ? (
      <AdminContainer>
        <SidebarContainer>
          <SideBar type="myPage" contentsList={mypageList} />
        </SidebarContainer>
        <VerticalDivider />
        <Container>
          {type && getPageByType(type)}
        </Container>
      </AdminContainer>
    ) : <AdminContainer />
  );
}
