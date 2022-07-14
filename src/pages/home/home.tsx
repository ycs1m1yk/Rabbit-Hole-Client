/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Slider from '@pages/home/components/Slider';
import BoardImage from '@assets/images/main_board.avif';
import ProjectImage from '@assets/images/main_project.avif';
import MentoringImage from '@assets/images/main_mentoring.avif';
import Card from '@/components/card';
import PostList from '@/components/postList';
import { useQueries } from 'react-query';
import { getAllArticle } from '@/lib/articleApi';
import { IArticleProps } from '@/interfaces/interface';

const Container = styled.div``;

const MainSliderContainer = styled.div`
  width: 1000px;
  margin: 2rem auto;
`;

const MainSliderImage = styled.img`
  height: 400px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2.5rem;
  text-align: center;
  margin: 10rem 0rem 5rem 0rem;
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

const projects = [
  {
    _id: '1322345',
    title: '설재혁의 프로젝트',
    author: '설재혁',
    authorId: '326823',
    shortDescription: '개인 프로젝트입니다.',
    description: 'aaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbcccc',
    thumbnail: 'https://via.placeholder.com/200',
    likes: ['1', '2', '3', '4', '5', '56'],
    tags: ['React', 'Typescript', 'React', 'Typescript'],
    views: 1278,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: '21321',
  },
  {
    _id: '123445',
    title: '설재혁의 프로젝트',
    author: '설재혁',
    authorId: '326823',
    shortDescription: '개인 프로젝트입니다.',
    description: 'aaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbcccc',
    thumbnail: 'https://via.placeholder.com/200',
    likes: ['1', '2', '3', '4', '5', '56'],
    tags: ['React'],
    views: 1278,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: '21321',
  },
  {
    _id: '123425',
    title: '설재혁의 프로젝트',
    author: '설재혁',
    authorId: '326823',
    shortDescription: '개인 프로젝트입니다.',
    description: 'aaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbcccc',
    thumbnail: 'https://via.placeholder.com/200',
    likes: ['1', '2', '3', '4', '5', '56'],
    tags: ['React', 'Typescript'],
    views: 12728,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: '21321',
  },
  {
    _id: '1233245',
    title: '설재혁의 프로젝트',
    author: '설재혁',
    authorId: '326823',
    shortDescription: '개인 프로젝트입니다.',
    description: 'aaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbcccc',
    thumbnail: 'https://via.placeholder.com/200',
    likes: ['1', '2', '3', '4', '5', '56'],
    tags: ['React', 'Typescript'],
    views: 124378,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: '21321',
  },
  {
    _id: '1233432432245',
    title: '설재혁의 프로젝트',
    author: '설재혁',
    authorId: '326823',
    shortDescription: '개인 프로젝트입니다.',
    description: 'aaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbcccc',
    thumbnail: 'https://via.placeholder.com/200',
    likes: ['1', '2', '3', '4', '5', '56'],
    tags: ['React', 'Typescript'],
    views: 123478,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: '21321',
  },
  {
    _id: '1233232345',
    title: '설재혁의 프로젝트',
    author: '설재혁',
    authorId: '326823',
    shortDescription: '개인 프로젝트입니다.',
    description: 'aaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbccccaaabbbbcccc',
    thumbnail: 'https://via.placeholder.com/200',
    likes: ['1', '2', '3', '4', '5', '56'],
    tags: ['React', 'Typescript'],
    views: 12728,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: '21321',
  },
];

const posts: IArticleProps[] = [
  {
    _id: '1111',
    articleType: 'free',
    author: 'halley',
    authorId: 'satoly4',
    title: '안녕하세요',
    content: '반갑습니다',
    likes: [{ userId: '1234' }],
    views: 123,
    carrots: 100,
    tags: [{ name: '엘' }, { name: '리' }, { name: '스' }],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 1111,
  },
  {
    _id: '2222',
    articleType: 'free',
    author: 'halley',
    authorId: 'satoly4',
    title: '안녕하세요',
    content: '반갑습니다',
    likes: [{ userId: '1234' }],
    views: 123,
    carrots: 100,
    tags: [{ name: '엘' }, { name: '리' }, { name: '스' }],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 2222,
  },
  {
    _id: '7777',
    articleType: 'free',
    author: 'halley',
    authorId: 'satoly4',
    title: '안녕하세요',
    content: '반갑습니다',
    likes: [{ userId: '1234' }],
    views: 123,
    carrots: 100,
    tags: [{ name: '엘' }, { name: '리' }, { name: '스' }],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 7777,
  },
  {
    _id: '8888',
    articleType: 'free',
    author: 'halley',
    authorId: 'satoly4',
    title: '안녕하세요',
    content: '반갑습니다',
    likes: [{ userId: '1234' }],
    views: 123,
    carrots: 100,
    tags: [{ name: '엘' }, { name: '리' }, { name: '스' }],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 8888,
  },
  {
    _id: '3333',
    articleType: 'free',
    author: 'halley',
    authorId: 'satoly4',
    title: '안녕하세요',
    content: '반갑습니다',
    likes: [{ userId: '1234' }],
    views: 123,
    carrots: 100,
    tags: [{ name: '엘' }, { name: '리' }, { name: '스' }],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 3333,
  },
  {
    _id: '4444',
    articleType: 'free',
    author: 'halley',
    authorId: 'satoly4',
    title: '안녕하세요',
    content: '반갑습니다',
    likes: [{ userId: '1234' }],
    views: 123,
    carrots: 100,
    tags: [{ name: '엘' }, { name: '리' }, { name: '스' }],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 4444,
  },
  {
    _id: '5555',
    articleType: 'free',
    author: 'halley',
    authorId: 'satoly4',
    title: '안녕하세요',
    content: '반갑습니다',
    likes: [{ userId: '1234' }],
    views: 123,
    carrots: 100,
    tags: [{ name: '엘' }, { name: '리' }, { name: '스' }],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 5555,
  },
  {
    _id: '6666',
    articleType: 'free',
    author: 'halley',
    authorId: 'satoly4',
    title: '안녕하세요',
    content: '반갑습니다',
    likes: [{ userId: '1234' }],
    views: 123,
    carrots: 100,
    tags: [{ name: '엘' }, { name: '리' }, { name: '스' }],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 6666,
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

  // Main Slider Image
  const images: string[] = [BoardImage, ProjectImage, MentoringImage];

  // Data fetching and set data
  const questionParams = { articleType: 'question' };
  const freeParams = { articleType: 'free' };
  const results = useQueries([
    {
      queryKey: ['question'],
      queryFn: () => getAllArticle(questionParams),
    },
    {
      queryKey: ['free'],
      queryFn: () => getAllArticle(freeParams),
    },
  ]);

  console.log(results);

  // 이미지 preloading
  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  return (
    <Container>
      <MainSliderContainer>
        <Slider>
          <Link to="/board"><MainSliderImage src={BoardImage} /></Link>
          <Link to="/mentoring"><MainSliderImage src={MentoringImage} /></Link>
          <Link to="/projects"><MainSliderImage src={ProjectImage} /></Link>
        </Slider>
      </MainSliderContainer>
      <Title>프로젝트</Title>
      <ProjectSliderContainer>
        <Slider settings={projectSettings}>
          {projects.map((project) => (
            <Card
              key={project._id}
              projectId={project._id}
              title={project.title}
              author={project.author}
              shortDescription={project.shortDescription}
              description={project.description}
              thumbnail={project.thumbnail}
              likes={project.likes.length}
              tags={project.tags}
              date={project.createdAt.toLocaleDateString()}
              views={project.views.toLocaleString()}
              type="project"
            />
          ))}
        </Slider>
      </ProjectSliderContainer>
      <ContentContainer>
        <PostList type="question" posts={posts.slice(0, 5)} />
        <PostList type="free" posts={posts.slice(0, 5)} />
      </ContentContainer>
    </Container>
  );
}
