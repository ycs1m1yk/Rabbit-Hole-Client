/* eslint-disable no-underscore-dangle */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import Search from '@/components/search';
import Card from '@/components/card';
import Pagination from '@/components/pagination';
import SelectBox from '@/components/selectBox';

import * as searchApi from '@lib/searchApi';
import { IProjectProps } from '@/interfaces/interface';
import { isEmptyArray } from '@/utils/func';

const ProjectContainer = styled.div`
  max-width: 1440px;
  padding: 3rem;
  margin-left: auto;
  margin-right: auto;
`;

const Alignments = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  margin: 1rem 0;
`;

const Alignment = styled.li`
  vertical-align: middle;
  margin-left: 2rem;
  list-style-type: disc;
  color: ${({ theme }) => theme.palette.gray};
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 26px;
  cursor: pointer;

  &[selected],
  &:hover{
    font-weight: 700;
    color: ${({ theme }) => theme.palette.eliceViolet};
  }  
`;

const ProjectHeader = styled.div`
  font-size: 3rem;
  margin: 2rem 0rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderGray};
  padding-bottom: 4rem;
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
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

const EmptyField = styled.p`
  width: 70rem;
  text-align: center;
  margin: 20rem 0 20rem 43rem;
  color: ${({ theme }) => theme.palette.black};
  opacity: 0.5;
  font-size: 4rem;
  font-weight: 700;
`;

export default function ProjectsSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputType, setInputType] = useState<string>('title');
  const [perPage, setPerPage] = useState<string>('6');
  const [query, setQuery] = useState<any>({
    filter: 'date', page: '1', perPage: '6',
  });

  // ???????????? ??????
  const handleSort = useCallback((sortType: string) => {
    searchParams.set('filter', sortType);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  }, []);

  // ???????????? ???????????? ??? ??????
  const handlePerPage = useCallback((perP: string) => {
    searchParams.set('perPage', perP);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  }, []);

  // ????????? ????????? ?????? URL ??????
  const handleNavigate = useCallback((pageNumber: number) => {
    searchParams.set('page', `${pageNumber + 1}`);
    setSearchParams(searchParams);
  }, []);

  const { data, refetch } = useQuery<any, Error>(
    ['projectList', query],
    () => {
      if (inputType === 'title') {
        return searchApi.searchProjectsByTitle({ ...query });
      }
      return searchApi.searchProjectsByAuthor({ ...query });
    },
    {
      suspense: true,
      staleTime: 180000,
      onError: (err) => console.log(err),
    },
  );

  useEffect(() => {
    searchParams.forEach((v, k) => setQuery((q: any) => ({ ...q, [k]: v })));

    refetch();
  }, [searchParams]);

  return (
    <ProjectContainer>
      <ProjectHeader>
        ???????????? ?????????
        <SearchContainer>
          <Search projectQuery={query} setInputType={setInputType} />
        </SearchContainer>
      </ProjectHeader>
      <Alignments>
        <Alignment onClick={() => handleSort('date')}>?????????</Alignment>
        <Alignment onClick={() => handleSort('views')}>?????????</Alignment>
        <SelectBoxWrapper className="selectbox-perpage">
          <SelectBox options={['3', '6', '9', '12']} defaultValue="???????????? ??????" selectedOption={perPage} setSelectedOption={setPerPage} requestFunc={handlePerPage} width={70} type="register" />
        </SelectBoxWrapper>
      </Alignments>
      <Content>
        {isEmptyArray(data.projectList)
          ? <EmptyField>???????????? ???????????? ????????????.</EmptyField>
          : data.projectList.map((project: IProjectProps) => (
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
          length={data.totalPage}
          start={query.page ? +(query.page) - 1 : 0}
          handler={(pageNumber) => handleNavigate(pageNumber)}
        />
      </PaginationContainer>
    </ProjectContainer>
  );
}
