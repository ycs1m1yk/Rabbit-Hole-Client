import React, {
  useCallback,
} from 'react';
import {
  Link, useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import Logo from '@components/logo';

import { useSetRecoilState } from 'recoil';
import modalAtom from '@/recoil/modal/modalAtom';

import useToken from '@/hooks/useToken';

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100vw;
  min-width: 1000px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 10rem;
  padding: 0 3rem;
  border-bottom: 1px solid ${(props) => props.theme.palette.borderGray};
  
  color: ${(props) => props.theme.palette.gray};
  background-color: #FFFF;
  line-height: 1.5;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex: 1 1 0%;
  height: inherit;
  margin-left: 3rem;
  gap: 2rem;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  
  & > *:not(:first-child) {
    margin-left: 2rem;
  }
`;

const StyledLink = styled(Link)<{ismatch:string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  font-weight: 600;
  font-size: 1.8rem;
  white-space: nowrap;


  color: ${({ theme, ismatch }) => ismatch === 'true' && theme.palette.eliceViolet};

  :hover {
    color: ${({ theme }) => theme.palette.eliceViolet};
  }
`;

const StyledAuth = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 1.8rem;
  white-space: nowrap;
  cursor: pointer;
  & + & {
    margin-left: 2rem;
  }
`;

export default function Header() {
  const setModal = useSetRecoilState(modalAtom); // 모달 상태 전역관리
  const { authInfo, setLogout } = useToken(); // 로그인 상태 확인
  const { pathname } = useLocation();

  const handleModal = useCallback((type:any) => {
    setModal(type);
  }, []);

  return (
    <StyledHeader>
      <Link to="/">
        <Logo />
      </Link>
      <Nav>
        <StyledLink ismatch={String(pathname.includes('/board'))} to="/board">게시판</StyledLink>
        <StyledLink ismatch={String(pathname.includes('/projects'))} to="/projects?filter=date&page=1&perPage=6">프로젝트 갤러리</StyledLink>
      </Nav>
      <HeaderRight>
        {
          authInfo // 로그인 상태 조건부 렌더링
            ? (
              <>
                <StyledAuth onClick={setLogout}>로그아웃</StyledAuth>
                <StyledLink ismatch={String(pathname.includes('/mypage'))} to="/mypage">마이페이지</StyledLink>
              </>
            )
            : <StyledAuth onClick={() => handleModal('Login')}>로그인</StyledAuth>
        }

      </HeaderRight>
    </StyledHeader>
  );
}
