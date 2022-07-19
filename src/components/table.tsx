/* eslint-disable max-len */
/* eslint no-underscore-dangle: 0 */
import {
  IArticleProps, IProjectProps,
} from '@/interfaces/interface';
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { deleteProjectById } from '@/lib/projectApi';
import useToken from '@/hooks/useToken';
import { deleteArticleById } from '@/lib/articleApi';
import Button from './button';

// table
const TableContainer = styled.table`
  width: 900px;
  margin: 2rem 0;
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

  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface TableProps{
  items: IProjectProps[] | IArticleProps[]
  type: string;
}

export default function Table({ type, items }:TableProps) {
  const navigate = useNavigate();
  const { authInfo } = useToken();

  const [checkedItems, setCheckedItems] = useState<any>([]);

  // 아이템 눌렀을 때 detail로 routing
  const clickHandler = (itemId : string) => {
    if (type === 'project') {
      navigate(`/projects/detail?projectId=${itemId}`);
    } else if (type === 'article') {
      navigate(`/board/detail?id=${itemId}`);
    }
  };

  // 체크박스 누른 item의 id 값 얻어오기
  const handleCheckBox = (e: ChangeEvent, id: string) => {
    setCheckedItems((prev: string[]) => {
      if (prev.includes(id)) {
        const newArr = prev.filter((itemId) => itemId !== id);
        return newArr;
      }
      return [...prev, id];
    });
  };

  // 전체 삭제
  const handleAllItemDelete = () => {
    const allItems = items.map((item) => item._id); // 모든 아이템의 id
    let flag = true; // 요청 성공 실패 여부

    // 1차적으로 확인 후 진행
    if (confirm('정말 삭제하시겠습니까?')) {
      // 프로젝트 전체 삭제
      if (type === 'project') {
        if (allItems.length > 0) {
          allItems.map(async (itemId: string) => {
            const response = await deleteProjectById(authInfo!.token, itemId);

            // 요청 실패하는 경우
            if (response.status >= 400) {
              alert('프로젝트 삭제가 실패했습니다. 다시 시도해주세요:(');
              flag = false;
              setCheckedItems([]);
            }
          });

          // 요청이 성공한 경우 성공 alert
          if (flag) {
            alert('프로젝트가 성공적으로 삭제되었습니다:)');
          }

          // 요청 결과 상관없이 페이지 reload
          window.location.reload();
        }
      }

      // 게시글 전체 삭제
      if (type === 'article') {
        if (allItems.length > 0) {
          allItems.map(async (itemId: string) => {
            const response = await deleteArticleById(authInfo!.token, itemId);

            // 요청 실패하는 경우
            if (response.status >= 400) {
              alert('게시물 삭제가 실패했습니다. 다시 시도해주세요:(');
              flag = false;
              setCheckedItems([]);
            }
          });

          // 요청이 성공한 경우 성공 alert
          if (flag) {
            alert('게시물이 성공적으로 삭제되었습니다:)');
          }

          // 요청 결과 상관없이 페이지 reload
          window.location.reload();
        }
      }
    }
  };

  // 선택한 Item 삭제
  const handleItemDelete = async () => {
    // Project 선택 삭제
    let flag = true;
    if (type === 'project') {
      if (checkedItems.length > 0) {
        checkedItems.map(async (itemId: string) => {
          const response = await deleteProjectById(authInfo!.token, itemId);

          // 요청 실패하는 경우
          if (response.status >= 400) {
            alert('프로젝트 삭제가 실패했습니다. 다시 시도해주세요:(');
            flag = false;
            setCheckedItems([]);
          }
        });

        // 요청이 성공한 경우 성공 alert
        if (flag) {
          alert('프로젝트가 성공적으로 삭제되었습니다:)');
        }

        // 요청 결과 상관없이 페이지 reload
        window.location.reload();
      }
    }

    // 게시물 선택 삭제
    if (type === 'article') {
      if (checkedItems.length > 0) {
        checkedItems.map(async (itemId: string) => {
          const response = await deleteArticleById(authInfo!.token, itemId);

          // 요청 실패하는 경우
          if (response.status >= 400) {
            alert('게시물 삭제가 실패했습니다. 다시 시도해주세요:(');
            flag = false;
            setCheckedItems([]);
          }
        });

        // 요청이 성공한 경우 성공 alert
        if (flag) {
          alert('게시물이 성공적으로 삭제되었습니다:)');
        }

        // 요청 결과 상관없이 페이지 reload
        window.location.reload();
      }
    }
  };

  return (
    <div>
      <ButtonContainer>
        <Button onClick={handleItemDelete}>선택 삭제</Button>
        <Button onClick={handleAllItemDelete}>전체 삭제</Button>
      </ButtonContainer>
      {items.length > 0 && (
      <TableContainer>
        {type === 'article' && (
        <colgroup>
          <col width="5%" />
          <col width="10%" />
          <col width="60%" />
          <col width="25%" />
        </colgroup>
        )}
        {type === 'project' && (
        <colgroup>
          <col width="5%" />
          <col width="10%" />
          <col width="60%" />
          <col width="25%" />
        </colgroup>
        )}
        <TableHead>
          {type === 'article' && (
            <tr>
              <HeadItem scope="col" />
              <HeadItem scope="col">연번</HeadItem>
              <HeadItem scope="col">제목</HeadItem>
              <HeadItem scope="col">작성 날짜</HeadItem>
            </tr>
          )}
          {type === 'project' && (
            <tr>
              <HeadItem scope="col" />
              <HeadItem scope="col">연번</HeadItem>
              <HeadItem scope="col">제목</HeadItem>
              <HeadItem scope="col">작성 날짜</HeadItem>
            </tr>
          )}
        </TableHead>
        <TableBody>
          {
            items.length > 0 && items.map((item, i):React.ReactNode => {
              if (type === 'article') {
                return (
                  <TableRow key={item._id}>
                    <TableItem><input type="checkbox" name={item._id} id={item._id} onChange={(e) => handleCheckBox(e, item._id)} /></TableItem>
                    <TableItem onClick={() => clickHandler(item._id)}>{i + 1}</TableItem>
                    <TableItem onClick={() => clickHandler(item._id)}>{item.title}</TableItem>
                    <TableItem onClick={() => clickHandler(item._id)}>{item.createdAt.slice(0, 10)}</TableItem>
                  </TableRow>
                );
              }
              if (type === 'project') {
                return (
                  <TableRow key={item._id}>
                    <TableItem><input type="checkbox" name={item._id} id={item._id} onChange={(e) => handleCheckBox(e, item._id)} /></TableItem>
                    <TableItem onClick={() => clickHandler(item._id)}>{i + 1}</TableItem>
                    <TableItem onClick={() => clickHandler(item._id)}>{item.title}</TableItem>
                    <TableItem onClick={() => clickHandler(item._id)}>{item.createdAt.slice(0, 10)}</TableItem>
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
    </div>
  );
}
