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

const EmptyField = styled.p`
  text-align: center;
  margin-top: 23rem;
  margin-bottom: 18rem;
  color: ${({ theme }) => theme.palette.black};
  opacity: 0.5;
  font-size: 4rem;
  font-weight: 700;
`;

interface IMyPageProjectProps {
  data: {projectList: IProjectProps[], totalPage: number};
  setPage: Dispatch<SetStateAction<number>>;
}

function MyPageProjects({
  data, setPage,
}: IMyPageProjectProps) {
  return data.projectList && (
    <Container>
      <Title>내 프로젝트 관리</Title>
      {
        data.projectList.length > 0
          ? (
            <>
              <TableConatiner>
                <Table type="project" items={data.projectList} />
              </TableConatiner>
              <PaginationContainer>
                <Pagination length={data.totalPage} handler={setPage} />
              </PaginationContainer>
            </>
          ) : <EmptyField>등록된 프로젝트가 없습니다.</EmptyField>
      }

    </Container>
  );
}

export default MyPageProjects;
