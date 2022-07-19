import Pagination from '@/components/pagination';
import Table from '@/components/table';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
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

const EmptyField = styled.p`
  text-align: center;
  margin-top: 23rem;
  margin-bottom: 18rem;
  color: ${({ theme }) => theme.palette.black};
  opacity: 0.5;
  font-size: 4rem;
  font-weight: 700;
`;

interface IMyPageArticleProps {
  data: {articleList: IArticleProps[], totalPage: number};
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setPerPage: Dispatch<SetStateAction<number>>;
}

function MyPageBoard({
  data, page, setPage, setPerPage,
}: IMyPageArticleProps) {
  useEffect(() => {

  }, [page]);
  return data.articleList && (
    <Container>
      <Title>내 게시글 관리</Title>
      {
        data.articleList.length > 0
          ? (
            <>
              <TableConatiner>
                <Table type="article" items={data.articleList} />
              </TableConatiner>
              <PaginationContainer>
                <Pagination length={data.totalPage} handler={setPage} />
              </PaginationContainer>
            </>
          ) : <EmptyField>등록된 게시물이 없습니다.</EmptyField>
      }
    </Container>
  );
}

export default MyPageBoard;
