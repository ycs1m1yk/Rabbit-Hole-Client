import React, { lazy, createContext, useMemo } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';

import { Socket } from 'socket.io-client';

import Register from '@pages/auth/register';
import Layout from '@pages/layout';
import Token from '@pages/auth/token';
import Chat from '@pages/chat';

import useModal from '@hooks/useModal';
import useToken from '@hooks/useToken';
import useSocket from '@hooks/useSocket';

const Home = lazy(() => import('@pages/home/home'));
const Board = lazy(() => import('@pages/board'));
const Projects = lazy(() => import('@/pages/projects/projects'));
const Mypage = lazy(() => import('@pages/myPage/myPage'));
const Admin = lazy(() => import('@pages/admin'));
const BoardDetail = lazy(() => import('@pages/boardDetail/boardDetail'));
const ProjectDetail = lazy(() => import('@pages/projects/projectDetail'));
const NotFound = lazy(() => import('@pages/notFound'));
const BoardSearch = lazy(() => import('@pages/search/boardSearch'));
const ProjectsSearch = lazy(() => import('@pages/search/projectsSearch'));
const Profile = lazy(() => import('@pages/profile/profile'));

export const SocketDispatch = createContext<{
  siteSocket:Socket|null, chatSocket:Socket|null
}>({ siteSocket: null, chatSocket: null });

function App() {
  const [getModalPage] = useModal();
  const { authInfo } = useToken();
  const [siteSocket, chatSocket] = useSocket();
  const socketValue = useMemo(() => ({ siteSocket, chatSocket }), [siteSocket, chatSocket]);
  return (
    <BrowserRouter>
      <SocketDispatch.Provider value={socketValue}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/board" element={<Board />} />
            <Route path="/board/detail" element={<BoardDetail />} />
            <Route path="/board/search" element={<BoardSearch />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/detail" element={<ProjectDetail />} />
            <Route path="/projects/search" element={<ProjectsSearch />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/github/register" element={<Register />} />
          <Route path="/github/login" element={<Token />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {getModalPage()}
        {authInfo && <Chat />}
      </SocketDispatch.Provider>
    </BrowserRouter>
  );
}

export default App;
