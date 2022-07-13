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
    projectId: '1234324',
    title: 'Main Project',
    author: '설재혁',
    authorId: '123432432',
    content: 'abcdefghijklmnop abcdefghijklmnop',
    thumbnail: 'https://via.placeholder.com/200',
    likes: 12,
  },
  {
    projectId: '123432432',
    title: 'Main Project',
    author: '설재혁',
    authorId: '123432432',
    content: 'abcdefghijklmnop abcdefghijklmnop',
    thumbnail: 'https://via.placeholder.com/200',
    likes: 9,
  },
  {
    projectId: '123893048239',
    title: 'Main Project',
    author: '설재혁',
    authorId: '123432432',
    content: 'abcdefghijklmnop abcdefghijklmnop',
    thumbnail: 'https://via.placeholder.com/200',
    likes: 1023,
  },
  {
    projectId: '1233821903809',
    title: 'Main Project',
    author: '설재혁',
    authorId: '123432432',
    content: 'abcdefghijklmnop abcdefghijklmnop',
    thumbnail: 'https://via.placeholder.com/200',
    likes: 65,
  },
];

const posts = [
  {
    articleType: 'qna',
    articleId: '12343423324',
    author: '설재혁',
    title: '설재혁의 게시글',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet doloribus aut, nemo nulla dicta molestias veniam voluptas culpa pariatur vero explicabo, accusantium dolores? Ullam, vero mollitia placeat animi aut eum.',
    createdAt: '2022.07.07',
    comment: 10,
    likes: 10,
    views: 1801,
    carrots: 50,
    tags: ['aaa', 'bbb', 'ccc'],
  },
  {
    articleType: 'free',
    articleId: '12343442342234',
    author: '설재혁',
    title: '설재혁의 게시글',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet doloribus aut, nemo nulla dicta molestias veniam voluptas culpa pariatur vero explicabo, accusantium dolores? Ullam, vero mollitia placeat animi aut eum.',
    createdAt: '2022.07.07',
    comment: 10,
    likes: 10,
    views: 1801,
    carrots: 50,
    tags: ['aaa', 'bbb', 'ccc'],
  },
  {
    articleType: 'qna',
    articleId: '12343543534234',
    author: '설재혁',
    title: '설재혁의 게시글',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet doloribus aut, nemo nulla dicta molestias veniam voluptas culpa pariatur vero explicabo, accusantium dolores? Ullam, vero mollitia placeat animi aut eum.',
    createdAt: '2022.07.07',
    comment: 10,
    likes: 10,
    views: 1801,
    carrots: 50,
    tags: ['aaa', 'bbb', 'ccc'],
  },
  {
    articleType: 'study',
    articleId: '123434524513523234',
    author: '설재혁',
    title: '설재혁의 게시글',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet doloribus aut, nemo nulla dicta molestias veniam voluptas culpa pariatur vero explicabo, accusantium dolores? Ullam, vero mollitia placeat animi aut eum.',
    createdAt: '2022.07.07',
    comment: 10,
    likes: 10,
    views: 1801,
    carrots: 50,
    tags: ['aaa', 'bbb', 'ccc'],
  },
  {
    articleType: 'free',
    articleId: '1234332131231314234',
    author: '설재혁',
    title: '설재혁의 게시글',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet doloribus aut, nemo nulla dicta molestias veniam voluptas culpa pariatur vero explicabo, accusantium dolores? Ullam, vero mollitia placeat animi aut eum.',
    createdAt: '2022.07.07',
    comment: 10,
    likes: 10,
    views: 1801,
    carrots: 50,
    tags: ['aaa', 'bbb', 'ccc'],
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
              key={project.projectId}
              title={project.title}
              author={project.author}
              content={project.content}
              thumbnail={project.thumbnail}
              likes={project.likes}
              projectId={project.projectId}
              type="project"
            />
          ))}
        </Slider>
      </ProjectSliderContainer>
      <ContentContainer>
        <PostList type="qna" posts={posts} />
        <PostList type="free" posts={posts} />
      </ContentContainer>
    </Container>
  );
}
