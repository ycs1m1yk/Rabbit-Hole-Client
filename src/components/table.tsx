import React from 'react';
import styled from 'styled-components';

// table
const TableContainer = styled.table`
  max-width: 900px;
  width: 100%;
  margin: 5rem;
  border: 1px solid #E1CFFF;
`;
const TableHead = styled.thead`
  height: 40px;
  vertical-align: middle;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  background-color: #F8F3FF;
  border-bottom: 1px solid #E1CFFF;
`;
const HeadItem = styled.th`
  padding: 10px 0;
  color: ${({ theme }) => theme.palette.black};
`;
const TableBody = styled.tbody`
  font-size: 12px;
  color: ${({ theme }) => theme.palette.gray};
`;
const TableRow = styled.tr`
  height: 40px;
  border-bottom: 1px solid #E1CFFF;

  &:hover {
    color: ${({ theme }) => theme.palette.black};
    background-color: #E1CFFF;
  }
`;
const TableItem = styled.td`
  padding: 10px 0;
  text-align: center;
  vertical-align: middle;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Checkbox = styled.input`
  color: #E1CFFF;
`;

interface articleObj{
  articleNumber: number;
  title: string;
  date: string;
}
interface mentoringObj{
  mentee: string;
  phone: string;
  email: string;
  content: string;
  date: string;
}
interface projectObj{
  projectNumber: number;
  title: string;
  date: string;
}
interface TableProps{
  type: string;
  items: articleObj[] | mentoringObj[] | projectObj[];
}

export default function Table({ type, items }:TableProps) {
  return (
    <TableContainer>
      {type === 'article' && (
      <colgroup>
        <col width="5%" />
        <col width="10%" />
        <col width="65%" />
        <col width="20%" />
      </colgroup>
      )}
      {type === 'mentoring' && (
      <colgroup>
        <col width="5%" />
        <col width="15%" />
        <col width="20%" />
        <col width="20%" />
        <col width="20%" />
        <col width="20%" />
      </colgroup>
      )}
      {type === 'project' && (
      <colgroup>
        <col width="5%" />
        <col width="10%" />
        <col width="65%" />
        <col width="20%" />
      </colgroup>
      )}
      <TableHead>
        {type === 'article' && (
          <tr>
            <HeadItem scope="col"><Checkbox type="checkbox" name="selectAll" id="" /></HeadItem>
            <HeadItem scope="col">글 번호</HeadItem>
            <HeadItem scope="col">제목</HeadItem>
            <HeadItem scope="col">작성 날짜</HeadItem>
          </tr>
        )}
        {type === 'mentoring' && (
          <tr>
            <HeadItem scope="col"><Checkbox type="checkbox" name="selectAll" id="" /></HeadItem>
            <HeadItem scope="col">신청인</HeadItem>
            <HeadItem scope="col">연락처</HeadItem>
            <HeadItem scope="col">이메일</HeadItem>
            <HeadItem scope="col">신청 내용</HeadItem>
            <HeadItem scope="col">신청 날자</HeadItem>
          </tr>
        )}
        {type === 'project' && (
          <tr>
            <HeadItem scope="col"><Checkbox type="checkbox" name="selectAll" id="" /></HeadItem>
            <HeadItem scope="col">프로젝트 번호</HeadItem>
            <HeadItem scope="col">제목</HeadItem>
            <HeadItem scope="col">작성 날짜</HeadItem>
          </tr>
        )}
      </TableHead>
      <TableBody>
        <TableRow>
          <TableItem><input type="checkbox" name="table" id="" /></TableItem>
          <TableItem>1</TableItem>
          <TableItem>1asdfasdfsdfasdfasd</TableItem>
          <TableItem>1</TableItem>
        </TableRow>
      </TableBody>
    </TableContainer>
  );
}
