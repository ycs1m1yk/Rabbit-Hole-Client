import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Board from '@pages/board';
import Home from '@pages/home';
import Mentoring from '@pages/mentoring';
import Mypage from '@pages/mypage';
import Projects from '@pages/projects';
import Register from '@pages/auth/register';

import Header from '@components/header';
import Footer from '@components/footer';

import useModal from './hooks/useModal';

function App() {
  const [getModalPage] = useModal();
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/mentoring" element={<Mentoring />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/github/register" element={<Register />} />
      </Routes>
      <Footer />
      {getModalPage()}
    </BrowserRouter>
  );
}

export default App;
