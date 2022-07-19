import React, { MouseEvent, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { lighten } from 'polished';
import styled from 'styled-components';
import Logo from '@components/logo';

import modalAtom from '@/recoil/modal/modalAtom';
import { useSetRecoilState } from 'recoil';

import useToken from '@/hooks/useToken';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 10rem;
  padding: 0 3rem;
  border-bottom: 1px solid ${(props) => props.theme.palette.borderGray};
  
  color: ${(props) => props.theme.palette.gray};

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

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  font-weight: 600;
  font-size: 1.8rem;
  white-space: nowrap;

  & + & {
    margin-left: 2rem;
  }
  &.active {
    color: ${(props) => props.theme.palette.eliceViolet}
  }
  :hover {
    background-color: ${(props) => lighten(0.5, props.theme.palette.eliceViolet)};;
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
  const anchorRef = useRef<HTMLAnchorElement>();
  const setModal = useSetRecoilState(modalAtom); // 모달 상태 전역관리
  const { authInfo, setLogout } = useToken(); // 로그인 상태 확인

  const handleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchorTarget = target.closest('a') || undefined;

    if (anchorRef.current) {
      anchorRef.current.classList.remove('active');
    }
    anchorRef.current = anchorTarget;
    anchorRef.current?.classList.add('active');
  }, []);

  const handleModal = useCallback((type:any) => {
    setModal(type);
  }, []);

  return (
    <StyledHeader onClick={handleClick}>
      <Link to="/">
        <Logo />
      </Link>
      <Nav>
        <StyledLink to="/board">게시판</StyledLink>
        <StyledLink to="/projects?filter=date&page=1&perPage=8">프로젝트 갤러리</StyledLink>
      </Nav>
      <HeaderRight>
        {
          authInfo // 로그인 상태 조건부 렌더링
            ? (
              <>
                <StyledAuth onClick={setLogout}>로그아웃</StyledAuth>
                <StyledLink to="/mypage?type=profile">마이페이지</StyledLink>
              </>
            )
            : <StyledAuth onClick={() => handleModal('Login')}>로그인</StyledAuth>
        }

      </HeaderRight>
    </StyledHeader>
  );
}
