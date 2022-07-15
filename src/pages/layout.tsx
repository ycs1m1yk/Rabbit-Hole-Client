import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from '@components/header';
import Footer from '@components/footer';
import Loading from '@/components/loading';

const Container = styled.div`
  min-width: 144rem;
`;

function Layout() {
  return (
    <Container>
      <Header />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </Container>
  );
}

export default Layout;
