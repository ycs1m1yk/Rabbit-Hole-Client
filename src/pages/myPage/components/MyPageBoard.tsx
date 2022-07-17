import Pagination from '@/components/pagination';
import React, { Dispatch, SetStateAction } from 'react';

interface IProjectProps {
  data: any;
  page: number;
  perPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  setPerPage: Dispatch<SetStateAction<number>>;
}

function MyPageBoard({
  data, page, perPage, setPage, setPerPage,
}: IProjectProps) {
  console.log('Article Data:', data, page, perPage);
  return (
    <div>
      <Pagination handler={setPage} />
    </div>
  );
}

export default MyPageBoard;
