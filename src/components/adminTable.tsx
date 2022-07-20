/* eslint no-underscore-dangle: 0 */
import modalAtom from '@/recoil/modal/modalAtom';
import React, {
  ChangeEvent, useCallback,
} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Button from './button';

// table
const TableContainer = styled.table`
  max-width: 900px;
  width: 100%;
  margin: 2rem auto;
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
  position: relative;
  height: 40px;
  border-bottom: 1px solid #E1CFFF;

  &:hover {
    color: ${({ theme }) => theme.palette.black};
    background-color: #E1CFFF;
  }
`;
const TableItem = styled.td`
  position: relative;
  padding: 10px 5px;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 10rem;
  height: 40px;
`;
const Checkbox = styled.input`
  color: #E1CFFF;
`;
const NormalCheck = styled.input`
  z-index: 1;
  position: relative;
`;

const Avatar = styled.img`
  height: 100%;
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
  authImage?:string;
}

interface projectObj{
  type: 'project';
  _id:string;
  title: string;
  author: string
  createdAt: Date;
  selected: boolean;
  path: string;
  thumbnail:string;
}
interface TableProps{
  items: articleObj[] | projectObj[] | userObj[];
  setItems: React.Dispatch<React.SetStateAction<any>>
}

export default function AdminTable({ items, setItems }:TableProps) {
  const setModal = useSetRecoilState(modalAtom);
  const [query, setQuery] = useSearchParams();
  const navigate = useNavigate();
  const page = Number(query.get('page'));
  const perPage = Number(query.get('perPage'));

  const detailHandler = useCallback((e:any, path:string) => {
    navigate(path);
  }, []);

  const checkHandler = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setItems(items.map((item) => {
      if (item._id === e.target.value) {
        return { ...item, selected: e.target.checked };
      }
      return item;
    }));
  }, [items]);

  const checkAllHandler = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setItems(items.map((item) => ({ ...item, selected: e.target.checked })));
  }, [items]);

  const modalHandler = useCallback((image:string, userId:string) => {
    const newQuery:{[index:string]:string} = { image, userId };
    // eslint-disable-next-line no-restricted-syntax
    for (const [name, value] of query.entries()) {
      newQuery[name] = value;
    }
    setQuery(newQuery, { replace: false });
    setModal('CertificateImage');
  }, []);

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
        {(items[0].type === 'user' && items[0].role === 'guest') && (
          <colgroup>
            <col width="5%" />
            <col width="11%" />
            <col width="13%" />
            <col width="13%" />
            <col width="13%" />
            <col width="13%" />
            <col width="13%" />
            <col width="13%" />
            <col width="6%" />
          </colgroup>
        )}
        {(items[0].type === 'user' && items[0].role !== 'guest') && (
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
          <col width="15%" />
          <col width="40%" />
          <col width="10%" />
          <col width="20%" />
        </colgroup>
        )}
        <TableHead>
          {items[0].type === 'article' && (
            <tr>
              <HeadItem scope="col"><Checkbox type="checkbox" name="selectAll" id="" onChange={checkAllHandler} /></HeadItem>
              <HeadItem scope="col">글 번호</HeadItem>
              <HeadItem scope="col">제목</HeadItem>
              <HeadItem scope="col">작성자</HeadItem>
              <HeadItem scope="col">작성 날짜</HeadItem>
            </tr>
          )}
          {(items[0].type === 'user' && items[0].role === 'guest') && (
            <tr>
              <HeadItem scope="col"><Checkbox type="checkbox" name="selectAll" id="" onChange={checkAllHandler} /></HeadItem>
              <HeadItem scope="col">프로필</HeadItem>
              <HeadItem scope="col">이름</HeadItem>
              <HeadItem scope="col">이메일</HeadItem>
              <HeadItem scope="col">트랙</HeadItem>
              <HeadItem scope="col">기수</HeadItem>
              <HeadItem scope="col">포지션</HeadItem>
              <HeadItem scope="col">역할</HeadItem>
              <HeadItem scope="col">인증</HeadItem>
            </tr>
          )}
          {(items[0].type === 'user' && items[0].role !== 'guest') && (
            <tr>
              <HeadItem scope="col"><Checkbox type="checkbox" name="selectAll" id="" onChange={checkAllHandler} /></HeadItem>
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
              <HeadItem scope="col"><Checkbox type="checkbox" name="selectAll" id="" onChange={checkAllHandler} /></HeadItem>
              <HeadItem scope="col">번호</HeadItem>
              <HeadItem scope="col">썸네일</HeadItem>
              <HeadItem scope="col">제목</HeadItem>
              <HeadItem scope="col">작성자</HeadItem>
              <HeadItem scope="col">작성 날짜</HeadItem>
            </tr>
          )}
        </TableHead>
        <TableBody>
          {
            items.length > 0 && items
              .map((item:any, index:number):React.ReactNode => {
                if (item.type === 'article') {
                  return (
                    <TableRow>
                      <TableItem><NormalCheck type="checkbox" name="article" value={item._id} checked={item.selected} onChange={checkHandler} /></TableItem>
                      <TableItem onClick={(e) => { detailHandler(e, item.path); }}>
                        {(page - 1) * perPage + 1 + index }
                      </TableItem>
                      <TableItem onClick={(e) => { detailHandler(e, item.path); }}>
                        {item.title}
                      </TableItem>
                      <TableItem onClick={(e) => { detailHandler(e, item.path); }}>
                        {item.author}
                      </TableItem>
                      <TableItem onClick={(e) => { detailHandler(e, item.path); }}>
                        {formatDate(item.createdAt)}
                      </TableItem>
                    </TableRow>
                  );
                }
                if (item.type === 'user') {
                  return (
                    <TableRow>
                      <TableItem><NormalCheck type="checkbox" name="user" checked={item.selected} value={item._id} onChange={checkHandler} /></TableItem>
                      <TableItem onClick={(e) => { detailHandler(e, item.path); }}>
                        <Avatar src={item.avatar} />
                      </TableItem>
                      <TableItem onClick={(e) => { detailHandler(e, item.path); }}>
                        {item.name}
                      </TableItem>
                      <TableItem onClick={(e) => { detailHandler(e, item.path); }}>
                        {item.email}
                      </TableItem>
                      <TableItem onClick={(e) => { detailHandler(e, item.path); }}>
                        {item.track}
                      </TableItem>
                      <TableItem onClick={(e) => { detailHandler(e, item.path); }}>
                        {item.trackCardinalNumber}
                      </TableItem>
                      <TableItem onClick={(e) => { detailHandler(e, item.path); }}>
                        {item.position}
                      </TableItem>
                      <TableItem onClick={(e) => { detailHandler(e, item.path); }}>
                        {item.role}
                      </TableItem>
                      {item.role === 'guest' && <TableItem><Button size="small" onClick={() => { modalHandler(item.authImage, item._id); }}>이미지</Button></TableItem>}
                    </TableRow>
                  );
                }
                if (item.type === 'project') {
                  return (
                    <TableRow>
                      <TableItem><NormalCheck type="checkbox" name="project" checked={item.selected} value={item._id} onChange={checkHandler} /></TableItem>
                      <TableItem onClick={(e) => { detailHandler(e, item.path); }}>
                        {(page - 1) * perPage + 1 + index}
                      </TableItem>
                      <TableItem onClick={(e) => { detailHandler(e, item.path); }}>
                        <Avatar src={item.thumbnail} />
                      </TableItem>
                      <TableItem onClick={(e) => { detailHandler(e, item.path); }}>
                        {item.title}
                      </TableItem>
                      <TableItem onClick={(e) => { detailHandler(e, item.path); }}>
                        {item.author}
                      </TableItem>
                      <TableItem onClick={(e) => { detailHandler(e, item.path); }}>
                        {formatDate(item.createdAt)}
                      </TableItem>
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
