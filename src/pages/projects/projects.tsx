/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useSearchParams } from 'react-router-dom';

import Button from '@/components/button';
import Search from '@/components/search';
import Card from '@/components/card';
import Pagination from '@/components/pagination';
import modalAtom from '@/recoil/modal/modalAtom';
import { IProjectGetParamsProps, IProjectProps } from '@/interfaces/interface';
import { getAllProjects } from '@/lib/projectApi';
import useToken from '@/hooks/useToken';
import SelectBox from '@/components/selectBox';
import { useQuery } from 'react-query';

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
  position: relative;
  margin: 1rem 0;
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

const SelectBoxWrapper = styled.div`
  position: absolute;
  right: 0;
  & select {
    text-align: center;
    height: 3.5rem;
    border: 1.5px solid ${({ theme }) => theme.palette.borderGray}
  }
`;

export default function Projects() {
  const setModal = useSetRecoilState(modalAtom);

  const { authInfo } = useToken();
  const [perPage, setPerPage] = useState<number>(8);

  /*
    초기 진입 시 정렬 기본값
      filter = 'date'
      page = 1
      perPage = 8
  */
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page'));
  const filter = searchParams.get('filter');

  const params: IProjectGetParamsProps = { filter, page, perPage };

  const { data: projects, refetch } = useQuery(['project', 'gallery'], () => getAllProjects(params), {
    staleTime: 180000,
  });

  // Modal Control
  const handleProjectEnrollment = (modalType: any) => {
    setModal(modalType);
  };

  // 인기순 정렬
  const handleSortByView = () => {
    searchParams.set('filter', 'views');
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  // 최신순 정렬
  const handleSortByDate = () => {
    searchParams.set('filter', 'date');
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  // 페이지당 프로젝트 수 설정
  const handlePerPage = (perP: string) => {
    searchParams.set('perPage', perP);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  // 페이지 변화에 따른 URL 변경
  const handleNavigate = (pageNumber: number) => {
    searchParams.set('page', `${pageNumber + 1}`);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    refetch();
  }, [filter, page, perPage]);

  return (
    <ProjectContainer>
      <ProjectHeader>
        프로젝트 갤러리
        <SearchContainer>
          <Search width={400} height={35} />
        </SearchContainer>
        {
            authInfo?.token && (
            <ButtonContainer>
              <Button size="small" onClick={() => handleProjectEnrollment('Register')}>프로젝트 등록</Button>
            </ButtonContainer>
            )
          }
      </ProjectHeader>
      <Alignments>
        <Alignment onClick={handleSortByDate}>최신순</Alignment>
        <Alignment onClick={handleSortByView}>인기순</Alignment>
        <SelectBoxWrapper className="selectbox-perpage">
          <SelectBox options={[4, 8, 12, 16]} defaultValue="페이지당 개수" selectedOption={perPage} setSelectedOption={setPerPage} requestFunc={handlePerPage} width={70} type="register" />
        </SelectBoxWrapper>
      </Alignments>
      <Content>
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
      </Content>
      <PaginationContainer>
        <Pagination
          length={projects?.totalPage}
          handler={(pageNumber) => handleNavigate(pageNumber)}
        />
      </PaginationContainer>
    </ProjectContainer>
  );
}
