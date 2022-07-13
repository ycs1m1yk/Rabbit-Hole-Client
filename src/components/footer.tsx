import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  background: linear-gradient(to right, #582A72, #9775AA);
  width: 100%;
  height: 7.5rem;
  display: flex;
  position: absolute;
  bottom: 0;
`;

const FooterItem = styled.a`
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2rem;
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
`;

/*
  TODO
  - 고객센터 클릭 시 채팅창 열기
  - Logo Component 완성 후 추가
  - Footer Item Link
*/

function Footer() {
  return (
    <Container>
      <FooterItem href="#">서비스 이용약관</FooterItem>
      <FooterItem href="#">개인정보 처리 방침</FooterItem>
      <FooterItem href="#">고객센터</FooterItem>
      <FooterItem href="https://www.notion.so/elice/8-6f218abdd0014712b95d485c295dd7af" target="_blank">프로젝트 소개</FooterItem>
    </Container>
  );
}

export default Footer;
