/* eslint no-underscore-dangle: 0 */
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
  type: 'article';
  articleId: string;
  title: string;
  createdAt: Date;
}

interface projectObj{
  type: 'project';
  _id: string;
  title: string;
  createdAt: Date;
}
interface TableProps{
  items: articleObj[] | projectObj[];
}

export default function Table({ items }:TableProps) {
  const padTo2Digits = (num: number):string => num.toString().padStart(2, '0');

  const formatDate = (date: Date):string => (
    `${[
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-')
    } ${
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')}`
  );

  const clickHandler = (item : articleObj | projectObj) => {
    console.log('디테일 이동', item);
  };

  return (
    <div>
      {items.length > 0 && (
      <TableContainer>
        {items[0].type === 'article' && (
        <colgroup>
          <col width="5%" />
          <col width="10%" />
          <col width="65%" />
          <col width="20%" />
        </colgroup>
        )}
        {/* {items[0].type === 'mentoring' && (
        <colgroup>
          <col width="5%" />
          <col width="15%" />
          <col width="20%" />
          <col width="20%" />
          <col width="20%" />
          <col width="20%" />
        </colgroup>
        )} */}
        {items[0].type === 'project' && (
        <colgroup>
          <col width="5%" />
          <col width="10%" />
          <col width="65%" />
          <col width="20%" />
        </colgroup>
        )}
        <TableHead>
          {items[0].type === 'article' && (
            <tr>
              <HeadItem scope="col"><Checkbox type="checkbox" name="selectAll" id="" /></HeadItem>
              <HeadItem scope="col">글 번호</HeadItem>
              <HeadItem scope="col">제목</HeadItem>
              <HeadItem scope="col">작성 날짜</HeadItem>
            </tr>
          )}
          {/* {items[0].type === 'mentoring' && (
            <tr>
              <HeadItem scope="col"><Checkbox type="checkbox" name="selectAll" id="" /></HeadItem>
              <HeadItem scope="col">신청인</HeadItem>
              <HeadItem scope="col">연락처</HeadItem>
              <HeadItem scope="col">이메일</HeadItem>
              <HeadItem scope="col">신청 내용</HeadItem>
              <HeadItem scope="col">신청 날자</HeadItem>
            </tr>
          )} */}
          {items[0].type === 'project' && (
            <tr>
              <HeadItem scope="col"><Checkbox type="checkbox" name="selectAll" id="" /></HeadItem>
              <HeadItem scope="col">프로젝트 번호</HeadItem>
              <HeadItem scope="col">제목</HeadItem>
              <HeadItem scope="col">작성 날짜</HeadItem>
            </tr>
          )}
        </TableHead>
        <TableBody>
          {
            items.length > 0 && items.map((item):React.ReactNode => {
              if (item.type === 'article') {
                return (
                  <TableRow key={item.articleId} onClick={() => { clickHandler(item); }}>
                    <TableItem><input type="checkbox" name={item.articleId} id={item.articleId} /></TableItem>
                    <TableItem>{item.articleId}</TableItem>
                    <TableItem>{item.title}</TableItem>
                    <TableItem>{formatDate(item.createdAt)}</TableItem>
                  </TableRow>
                );
              }
              if (item.type === 'project') {
                return (
                  <TableRow key={item._id} onClick={() => { clickHandler(item); }}>
                    <TableItem><input type="checkbox" name={item._id} id={item._id} /></TableItem>
                    <TableItem>{item._id}</TableItem>
                    <TableItem>{item.title}</TableItem>
                    <TableItem>{formatDate(item.createdAt)}</TableItem>
                  </TableRow>
                );
              }
              return (
                <div> Err</div>
              );
            })
          }
        </TableBody>
      </TableContainer>
      )}
      {items.length === 0 && <div>No data</div>}
    </div>
  );
}
