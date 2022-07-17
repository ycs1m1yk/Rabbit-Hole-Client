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
import { useQuery } from 'react-query';
import { getAllArticle } from '@/lib/articleApi';
import { IProjectProps } from '@/interfaces/interface';
import { getAllProjects } from '@/lib/projectApi';

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
  const projectParams = { filter: 'views', page: 1, perPage: 8 };

  const { data: freePosts } = useQuery(['free', 'main'], () => getAllArticle(freeParams), {
    staleTime: 180000,
  });

  const { data: questionPosts } = useQuery(['question', 'main'], () => getAllArticle(questionParams), {
    staleTime: 180000,
  });

  const { data: projects } = useQuery(['project', 'main'], () => getAllProjects(projectParams), {
    staleTime: 180000,
  });

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
          {projects?.projectList.map((project: IProjectProps) => (
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
              date={project.createdAt}
              views={project.views}
              type="project"
            />
          ))}
        </Slider>
      </ProjectSliderContainer>
      <ContentContainer>
        {freePosts && <PostList type="main" title="자유게시판" posts={freePosts.articleList.slice(0, 5)} />}
        {questionPosts && <PostList type="main" title="질의응답" posts={questionPosts.articleList.slice(0, 5)} />}
      </ContentContainer>
    </Container>
  );
}
