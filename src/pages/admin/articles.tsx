import React from 'react';
import styled from 'styled-components';
import Table from '@/components/table';

import { useQuery } from 'react-query';
import { getAllArticle } from '@/lib/adminApi';

export default function AdminArticle() {
  const { data } = useQuery(['admin', 'article'], getAllArticle);
  return (
    <>
      <h1>게시글 관리</h1>
      {data && <div>gdf</div>}
    </>
  );
}
