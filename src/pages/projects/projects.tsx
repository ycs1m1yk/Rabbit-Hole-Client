/* eslint-disable no-underscore-dangle */
import React from 'react';
import styled from 'styled-components';

import Button from '@/components/button';
import Search from '@/components/search';
import Card from '@/components/card';
import Pagination from '@/components/pagination';

const ProjectContainer = styled.div`
  padding: 3rem;
`;

const ProjectHeader = styled.div`
  font-size: 2.5rem;
  margin: 2rem 0rem;
  border-bottom: 1px solid black;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const SearchContainer = styled.div`
  position: absolute;
  right: 20%;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 0%;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
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
    tags: ['React', 'Typescript'],
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
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: '21321',
  },
];

export default function Projects() {
  const handlePagination = (pageNum: string) => {
    console.log(pageNum);
  };
  return (
    <ProjectContainer>
      <ProjectHeader>
        프로젝트 갤러리
        <SearchContainer>
          <Search width={400} height={30} />
        </SearchContainer>
        <ButtonContainer>
          <Button size="small" onClick={() => {}}>프로젝트 등록</Button>
        </ButtonContainer>
      </ProjectHeader>
      <Content>
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
            type="project"
          />
        ))}
      </Content>
      <PaginationContainer>
        <Pagination handler={handlePagination} />
      </PaginationContainer>
    </ProjectContainer>
  );
}
