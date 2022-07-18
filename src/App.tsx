import React, { lazy } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';

import Register from '@pages/auth/register';
import Layout from '@pages/layout';
import Token from '@pages/auth/token';

import useModal from '@hooks/useModal';

const Home = lazy(() => import('@pages/home/home'));
const Board = lazy(() => import('@pages/board'));
const Mentoring = lazy(() => import('@pages/mentoring'));
const Projects = lazy(() => import('@/pages/projects/projects'));
const Mypage = lazy(() => import('@pages/myPage/myPage'));
const Admin = lazy(() => import('@pages/admin'));
const BoardDetail = lazy(() => import('@pages/boardDetail/boardDetail'));
const ProjectDetail = lazy(() => import('@pages/projects/projectDetail'));

function App() {
  const [getModalPage] = useModal();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/detail" element={<BoardDetail />} />
          <Route path="/board/search" element={<Board />} />
          <Route path="/mentoring" element={<Mentoring />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/detail" element={<ProjectDetail />} />
          <Route path="/projects/search" element={<Projects />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="/github/register" element={<Register />} />
        <Route path="/github/login" element={<Token />} />
      </Routes>
      {getModalPage()}
    </BrowserRouter>
  );
}

export default App;
