import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Slider from '@pages/home/components/Slider';
import BoardImage from '@assets/images/main_board.jpg';
import ProjectImage from '@assets/images/main_project.jpg';
import MentoringImage from '@assets/images/main_mentoring.jpg';
import Card from '@/components/card';
import PostList from '@/components/postList';

const Container = styled.div``;

const MainSliderContainer = styled.div`
  width: 800px;
  margin: 2rem auto;
`;

const MainSliderImage = styled.img`
  height: 300px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
  text-align: center;
  margin: 10rem 0rem;
`;

const ProjectSliderContainer = styled.div`
  width: 1000px;
  margin: 2rem auto;
`;

const ContentContainer = styled.div`
  margin-top: 10rem;
  place-items: center;
  display: grid;
  grid-template-columns: 50% 50%;
  margin: 10rem auto; 
`;

// Schema 추가 요청 -> likes, projectId
const projects = [
  {
    projectId: '1234324',
    title: 'Main Project',
    author: '설재혁',
    authorId: '123432432',
    content: 'abcdefghijklmnop abcdefghijklmnop',
    thumbnail: 'https://via.placeholder.com/200',
  },
  {
    projectId: '123432432',
    title: 'Main Project',
    author: '설재혁',
    authorId: '123432432',
    content: 'abcdefghijklmnop abcdefghijklmnop',
    thumbnail: 'https://via.placeholder.com/200',
  },
  {
    projectId: '123893048239',
    title: 'Main Project',
    author: '설재혁',
    authorId: '123432432',
    content: 'abcdefghijklmnop abcdefghijklmnop',
    thumbnail: 'https://via.placeholder.com/200',
  },
  {
    projectId: '1233821903809',
    title: 'Main Project',
    author: '설재혁',
    authorId: '123432432',
    content: 'abcdefghijklmnop abcdefghijklmnop',
    thumbnail: 'https://via.placeholder.com/200',
  },
];

const posts = [
  {
    articleType: 'qna',
    articleId: '12343423324',
    author: '설재혁',
    title: '설재혁의 게시글',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet doloribus aut, nemo nulla dicta molestias veniam voluptas culpa pariatur vero explicabo, accusantium dolores? Ullam, vero mollitia placeat animi aut eum.',
    date: '2022.07.07',
    comment: 10,
    likes: 10,
  },
  {
    articleType: 'free',
    articleId: '12343442342234',
    author: '설재혁',
    title: '설재혁의 게시글',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet doloribus aut, nemo nulla dicta molestias veniam voluptas culpa pariatur vero explicabo, accusantium dolores? Ullam, vero mollitia placeat animi aut eum.',
    date: '2022.07.07',
    comment: 10,
    likes: 10,
  },
  {
    articleType: 'qna',
    articleId: '12343543534234',
    author: '설재혁',
    title: '설재혁의 게시글',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet doloribus aut, nemo nulla dicta molestias veniam voluptas culpa pariatur vero explicabo, accusantium dolores? Ullam, vero mollitia placeat animi aut eum.',
    date: '2022.07.07',
    comment: 10,
    likes: 10,
  },
  {
    articleType: 'study',
    articleId: '123434524513523234',
    author: '설재혁',
    title: '설재혁의 게시글',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet doloribus aut, nemo nulla dicta molestias veniam voluptas culpa pariatur vero explicabo, accusantium dolores? Ullam, vero mollitia placeat animi aut eum.',
    date: '2022.07.07',
    comment: 10,
    likes: 10,
  },
  {
    articleType: 'free',
    articleId: '1234332131231314234',
    author: '설재혁',
    title: '설재혁의 게시글',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet doloribus aut, nemo nulla dicta molestias veniam voluptas culpa pariatur vero explicabo, accusantium dolores? Ullam, vero mollitia placeat animi aut eum.',
    date: '2022.07.07',
    comment: 10,
    likes: 10,
  },
];

export default function Home() {
  const projectSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Container>
      <MainSliderContainer>
        <Slider>
          <Link to="/board"><MainSliderImage src={BoardImage} /></Link>
          <Link to="/metoring"><MainSliderImage src={MentoringImage} /></Link>
          <Link to="/projects"><MainSliderImage src={ProjectImage} /></Link>
        </Slider>
      </MainSliderContainer>
      <Title>프로젝트 갤러리</Title>
      <ProjectSliderContainer>
        <Slider settings={projectSettings}>
          {projects.map((project) => (
            <Card
              key={project.projectId}
              title={project.title}
              author={project.author}
              content={project.content}
              thumbnail={project.thumbnail}
            />
          ))}
        </Slider>
      </ProjectSliderContainer>
      <ContentContainer>
        <PostList type="main" posts={posts} />
      </ContentContainer>
    </Container>
  );
}
