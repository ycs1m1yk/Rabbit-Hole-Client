import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  display: flex;
  min-width: 1440px;
  width: -webkit-fill-available;
  height: 7.5rem;
  background: linear-gradient(to right, #582A72, #9775AA);
  position: absolute;
  bottom: 0;
`;

const FooterContents = styled.div`
  display: flex;
  flex: 1 1 auto;
  max-width: 1280px;
  margin: 0 auto;
  justify-self: center;
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
      <FooterContents>
        <FooterItem href="#">서비스 이용약관</FooterItem>
        <FooterItem href="#">개인정보 처리 방침</FooterItem>
        <FooterItem href="#">고객센터</FooterItem>
        <FooterItem href="https://www.notion.so/elice/8-6f218abdd0014712b95d485c295dd7af" target="_blank">프로젝트 소개</FooterItem>
      </FooterContents>
    </Container>
  );
}

export default Footer;
