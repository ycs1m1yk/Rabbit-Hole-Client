import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/header';
import Footer from '@components/footer';
import Loading from '@/components/loading';

function Layout() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}

export default Layout;
