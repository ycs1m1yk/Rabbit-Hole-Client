/* eslint no-underscore-dangle: 0 */
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  z-index: 0;
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
const NormalCheck = styled.input`
  z-index: 9999;
`;
interface articleObj{
  type: 'article';
  _id: string;
  articleType: string;
  author:string
  title: string;
  createdAt: Date;
  selected: boolean;
  path: string;
}

interface userObj{
  type: 'user';
  _id:string;
  avatar: string;
  name: string;
  email:string;
  track:string;
  trackCardinalNumber:string;
  position: string;
  role: string;
  createdAt:Date;
  selected:boolean;
}

interface projectObj{
  type: 'project';
  _id:string;
  title: string;
  author: string
  createdAt: Date;
  selected: boolean;
  path: string;
}
interface TableProps{
  items: articleObj[] | projectObj[] | userObj[];
  setItems: React.Dispatch<React.SetStateAction<any>>
}

export default function AdminTable({ items, setItems }:TableProps) {
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const page = Number(query.get('page'));
  const perPage = Number(query.get('perPage'));
  const detailHandler = (e:any, path:string) => {
    e.stopImmediatePropagation();
    navigate(path);
  };

  const checkHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setItems(items.map((item, index) => {
      if ((index >= perPage * (page - 1)
        && index < perPage * (page - 1) + perPage)
        && item._id === e.target.value) {
        return { ...item, selected: e.target.checked };
      }
      return item;
    }));
  };
  const checkAllHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setItems(items.map((item, index) => {
      if ((index >= perPage * (page - 1)
        && index < perPage * (page - 1) + perPage)) {
        return { ...item, selected: e.target.checked };
      }
      return item;
    }));
  };
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

  return (
    <div>
      {items.length > 0 && (
      <TableContainer>
        {items[0].type === 'article' && (
        <colgroup>
          <col width="5%" />
          <col width="10%" />
          <col width="55%" />
          <col width="15%" />
          <col width="15%" />
        </colgroup>
        )}
        {items[0].type === 'user' && (
        <colgroup>
          <col width="5%" />
          <col width="11%" />
          <col width="14%" />
          <col width="14%" />
          <col width="14%" />
          <col width="14%" />
          <col width="14%" />
          <col width="14%" />
        </colgroup>
        )}
        {items[0].type === 'project' && (
        <colgroup>
          <col width="5%" />
          <col width="10%" />
          <col width="10%" />
          <col width="55%" />
          <col width="20%" />
        </colgroup>
        )}
        <TableHead>
          {items[0].type === 'article' && (
            <tr>
              <HeadItem scope="col"><Checkbox type="checkbox" name="selectAll" id="" /></HeadItem>
              <HeadItem scope="col">글 번호</HeadItem>
              <HeadItem scope="col">제목</HeadItem>
              <HeadItem scope="col">작성자</HeadItem>
              <HeadItem scope="col">작성 날짜</HeadItem>
            </tr>
          )}
          {items[0].type === 'user' && (
            <tr>
              <HeadItem scope="col"><Checkbox type="checkbox" name="selectAll" id="" /></HeadItem>
              <HeadItem scope="col">프로필</HeadItem>
              <HeadItem scope="col">이름</HeadItem>
              <HeadItem scope="col">이메일</HeadItem>
              <HeadItem scope="col">트랙</HeadItem>
              <HeadItem scope="col">기수</HeadItem>
              <HeadItem scope="col">포지션</HeadItem>
              <HeadItem scope="col">역할</HeadItem>
            </tr>
          )}
          {items[0].type === 'project' && (
            <tr>
              <HeadItem scope="col"><Checkbox type="checkbox" name="selectAll" id="" /></HeadItem>
              <HeadItem scope="col">프로젝트 번호</HeadItem>
              <HeadItem scope="col">제목</HeadItem>
              <HeadItem scope="col">작성자</HeadItem>
              <HeadItem scope="col">작성 날짜</HeadItem>
            </tr>
          )}
        </TableHead>
        <TableBody>
          {
            items.length > 0 && items.slice(perPage * (page - 1), perPage)
              .map((item:any, index:number):React.ReactNode => {
                if (item.type === 'article') {
                  return (
                    <TableRow onClick={(e) => { detailHandler(e, item.path); }}>
                      <TableItem><NormalCheck type="checkbox" name="article" value={item._id} onChange={checkHandler} /></TableItem>
                      <TableItem>{index}</TableItem>
                      <TableItem>{item.title}</TableItem>
                      <TableItem>{item.author}</TableItem>
                      <TableItem>{formatDate(item.createdAt)}</TableItem>
                    </TableRow>
                  );
                }
                if (item.type === 'user') {
                  return (
                    <TableRow>
                      <TableItem><NormalCheck type="checkbox" name="user" value={item._id} /></TableItem>
                      <TableItem>{item.avatar}</TableItem>
                      <TableItem>{item.name}</TableItem>
                      <TableItem>{item.email}</TableItem>
                      <TableItem>{item.track}</TableItem>
                      <TableItem>{item.trackCardinalNumber}</TableItem>
                      <TableItem>{item.position}</TableItem>
                      <TableItem>{item.role}</TableItem>
                    </TableRow>
                  );
                }
                if (item.type === 'project') {
                  return (
                    <TableRow onClick={(e) => { detailHandler(e, item.path); }}>
                      <TableItem><NormalCheck type="checkbox" name="project" value={item._id} /></TableItem>
                      <TableItem>{item._id}</TableItem>
                      <TableItem>{item.title}</TableItem>
                      <TableItem>{item.author}</TableItem>
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
