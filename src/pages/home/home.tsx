import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Carousel from '@pages/home/components/Slider';
import BoardImage from '@assets/images/main_board.jpg';
import ProjectImage from '@assets/images/main_project.jpg';
import MentoringImage from '@assets/images/main_mentoring.jpg';

const Container = styled.div``;

const MainSliderContainer = styled.div`
  width: 800px;
  margin: 2rem auto;
`;

const MainSliderImage = styled.img`
  height: 300px;
  width: 100%;
`;

export default function Home() {
  return (
    <Container>
      <MainSliderContainer>
        <Carousel>
          <Link to="/board"><MainSliderImage src={BoardImage} /></Link>
          <Link to="/metoring"><MainSliderImage src={MentoringImage} /></Link>
          <Link to="/projects"><MainSliderImage src={ProjectImage} /></Link>
        </Carousel>
      </MainSliderContainer>
    </Container>
  );
}
