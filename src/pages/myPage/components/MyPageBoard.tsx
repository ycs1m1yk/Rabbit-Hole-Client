import Pagination from '@/components/pagination';
import Table from '@/components/table';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { IArticleProps } from '@interfaces/interface';

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

interface IMyPageArticleProps {
  data: {articleList: IArticleProps[], totalPage: number};
  setPage: Dispatch<SetStateAction<number>>;
  setPerPage: Dispatch<SetStateAction<number>>;
}

function MyPageProjects({
  data, setPage, setPerPage,
}: IMyPageArticleProps) {
  return data.articleList && (
    <Container>
      <Title>내 게시글 관리</Title>
      {
        data.articleList.length > 0
          ? (
            <>
              <TableConatiner>
                <Table type="project" items={data.articleList} />
              </TableConatiner>
              <PaginationContainer>
                <Pagination length={data.totalPage} handler={setPage} />
              </PaginationContainer>
            </>
          ) : <div>게시물이 존재하지 않습니다.</div>
      }
    </Container>
  );
}

export default MyPageProjects;
