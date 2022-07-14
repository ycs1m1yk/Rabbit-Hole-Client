/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
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

const EmptyField = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.black};
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

  const [freePosts, setFreePosts] = useState([]);
  const [questionPosts, setQuestionPosts] = useState([]);
  const [projects, setProjects] = useState<IProjectProps[]>([]);
  const results = useQueries([
    {
      queryKey: ['question', 'main'],
      queryFn: () => getAllArticle(questionParams),
      onSuccess({ articleList }: any) {
        setQuestionPosts(articleList);
      },
    },
    {
      queryKey: ['free', 'main'],
      queryFn: () => getAllArticle(freeParams),
      onSuccess({ articleList }: any) {
        setFreePosts(articleList);
      },
    },
    {
      queryKey: ['project', 'main'],
      queryFn: () => getAllProjects(projectParams),
      onSuccess({ projectList }: any) {
        setProjects(projectList);
      },
    },
  ]);

  // 이미지 preloading
  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  // console.log(results);
  // console.log('Free', freePosts);
  // console.log('Question', questionPosts);
  // console.log('Projects', projects);

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
          {projects && projects.slice(0, 8).map((project) => (
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
        {projects.length === 0 && <EmptyField>프로젝트가 존재하지 않습니다.</EmptyField>}
      </ProjectSliderContainer>
      <ContentContainer>
        <PostList type="main" title="자유게시판" posts={freePosts} />
        <PostList type="main" title="질의응답" posts={questionPosts} />
      </ContentContainer>
    </Container>
  );
}
