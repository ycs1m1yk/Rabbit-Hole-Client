import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '@components/header';
import Footer from '@components/footer';
import Loading from '@components/loading';

const Home = lazy(() => import('@pages/home'));
const Board = lazy(() => import('@pages/board'));
const Mentoring = lazy(() => import('@pages/mentoring'));
const Projects = lazy(() => import('@pages/projects'));
const Mypage = lazy(() => import('@pages/mypage'));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/mentoring" element={<Mentoring />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
