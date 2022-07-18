import Pagination from '@/components/pagination';
import React, { Dispatch, SetStateAction } from 'react';

interface IProjectProps {
  data: any;
  page: number;
  perPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  setPerPage: Dispatch<SetStateAction<number>>;
}

function MyPageProjects({
  data, page, perPage, setPage, setPerPage,
}: IProjectProps) {
  console.log('Project Data:', data, page, perPage);

  return (
    <div>
      <Pagination handler={setPage} />
    </div>
  );
}

export default MyPageProjects;
