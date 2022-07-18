import Pagination from '@/components/pagination';
import Table from '@/components/table';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { IProjectProps } from '@interfaces/interface';

const Container = styled.div`
  width: 100%;
  
`;

const Title = styled.h1`
  margin: 3rem;
`;

const TableConatiner = styled.div`
  display: flex;
  justify-content: center;
`;

const PaginationContainer = styled.div`
  text-align: center;
`;

interface IMyPageProjectProps {
  data: {projectList: IProjectProps[], totalPage: number};
  setPage: Dispatch<SetStateAction<number>>;
  setPerPage: Dispatch<SetStateAction<number>>;
}

function MyPageProjects({
  data, setPage, setPerPage,
}: IMyPageProjectProps) {
  return (
    <Container>
      <Title>내 프로젝트 관리</Title>
      <TableConatiner>
        <Table type="project" items={data.projectList} />
      </TableConatiner>
      <PaginationContainer>
        <Pagination length={data.totalPage} handler={setPage} />
      </PaginationContainer>
    </Container>
  );
}

export default MyPageProjects;
