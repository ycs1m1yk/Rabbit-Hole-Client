/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import Button from '@/components/button';
import Search from '@/components/search';
import Card from '@/components/card';
import Pagination from '@/components/pagination';
import modalAtom from '@/recoil/modal/modalAtom';
import { useQuery } from 'react-query';
import { getAllArticle } from '@/lib/articleApi';
import { IArticleGetProps, IProjectGetParamsProps, IProjectProps } from '@/interfaces/interface';
import { getAllProjects } from '@/lib/projectApi';

const ProjectContainer = styled.div`
  padding: 3rem;
`;

const Alignments = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4rem;
  & :hover{
    font-weight: 700;
    color: ${({ theme }) => theme.palette.eliceViolet};
  }
`;

const Alignment = styled.li`
  cursor: pointer;
  list-style-type: disc;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 26px;
  vertical-align: middle;
  margin-left: 2rem;
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
  top: -10%;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 0%;
  top: -10%;
  min-height: 45px;
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

export default function Projects() {
  const setModal = useSetRecoilState(modalAtom);
  const [filter, setFilter] = useState<string>('date');
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<any>(8);
  const [start, setStart] = useState<number>(0);

  // params로 프로젝트 GET 요청
  // const params: IProjectGetParamsProps = { filter, page, perPage };
  // const { data } = useQuery<IProjectProps[]>(['projectList'], () => getAllProjects(params));

  console.log(filter, page, perPage);
  // console.log(data);

  const handleProjectEnrollment = (modalType: any) => {
    setModal(modalType);
  };

  const handleSortByView = () => {
    setFilter('views');
    setPage(0);
    setStart(0);
  };

  const handleSortByDate = () => {
    setFilter('date');
    setPage(0);
    setStart(0);
  };

  return (
    <ProjectContainer>
      <ProjectHeader>
        프로젝트 갤러리
        <SearchContainer>
          <Search width={400} height={35} />
        </SearchContainer>
        <ButtonContainer>
          <Button size="small" onClick={() => handleProjectEnrollment('Register')}>프로젝트 등록</Button>
        </ButtonContainer>
      </ProjectHeader>
      <Alignments>
        <Alignment onClick={handleSortByDate}>최신순</Alignment>
        <Alignment onClick={handleSortByView}>인기순</Alignment>
      </Alignments>
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
            date={project.createdAt.toLocaleDateString()}
            views={project.views.toLocaleString()}
            type="project"
          />
        ))}
      </Content>
      <PaginationContainer>
        <Pagination
          length={Math.ceil(projects.length / perPage)}
          start={start}
          handler={setPage}
        />
      </PaginationContainer>
    </ProjectContainer>
  );
}
