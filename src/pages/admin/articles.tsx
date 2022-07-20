/* eslint-disable no-shadow */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import AdminTable from '@/components/adminTable';
import Loading from '@/components/loading';
import * as interfaces from '@interfaces/interface';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { deleteArticle, getAllArticle } from '@/lib/adminApi';
import useToken from '@/hooks/useToken';
import Pagination from '@components/pagination';
import Button from '@/components/button';
import SelectBox from '@/components/selectBox';

const boardType = [
  'question', 'free', 'study',
];

const Settings = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 90rem;
  margin:0 auto;
  margin-top: 2rem;
  height: 5rem;
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

interface TableProps{
    type:'article',
    _id:string,
    articleType:string,
    author:string,
    title:string
    createdAt:Date,
    selected:boolean,
    path:string,
  }

export default function AdminArticle() {
  const { authInfo } = useToken();
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const page = query.get('page') || '1';
  const perPage = query.get('perPage') || '10';
  const articleType = query.get('articleType') || 'question';
  const queryParams = page && perPage && articleType ? { page, perPage, articleType } : { page: '1', perPage: '10', articleType: 'question' };
  const [articleState, setArticleState] = useState<TableProps[]>();
  const [totalPageState, setTotalPageState] = useState<string>();
  const [selectedOption, setSelectedOption] = useState(articleType);
  const [start, setStart] = useState(parseInt(query.get('page') || '1', 10) - 1);
  const { data } = useQuery(['admin', articleType, page, perPage], async () => {
    let newArticles;
    if (authInfo && queryParams) {
      newArticles = await getAllArticle(authInfo.token, queryParams);
      newArticles.articleList = newArticles.articleList.map(({
        _id, articleType, author, title, createdAt,
      }:{
        _id: string, articleType: string, author: string, title: string, createdAt: string,
      }) => ({
        type: 'article',
        _id,
        articleType,
        author,
        title,
        createdAt: new Date(createdAt),
        selected: false,
        path: `/board?${articleType}=${_id}`,
      }));
    }
    return newArticles;
  }, {
    onSuccess(data) {
      console.log(page);
      setStart(page ? parseInt(page, 10) - 1 : 0);
      setArticleState(data.articleList);
      setTotalPageState(data.totalPage);
    },
  });

  useEffect(() => {
    navigate(`/admin?type=articles&articleType=${selectedOption}&page=1&perPage=10`, { replace: true });
  }, [selectedOption]);

  const deleteHandler = useCallback(async () => {
    if (authInfo && articleState) {
      if (confirm('정말 삭제하시겠습니까?')) {
        try {
          await Promise.all(articleState.map(async (article) => {
            if (article.selected) await deleteArticle(authInfo?.token, article._id);
          }));
        } catch (error) {
          alert('게시글 삭제가 실패했습니다. 다시 시도해주세요:(');
        }
        navigate(`/admin?type=articles&articleType=${selectedOption}&page=1&perPage=10`);
        window.location.reload();
      }
    } else {
      alert('관리자 권한이 없습니다.');
      navigate('/');
    }
  }, [articleState, authInfo, selectedOption]);

  const paginationHandler = useCallback((pageNumber:number) => {
    navigate(`/admin?type=articles&articleType=${selectedOption}&page=${Number(pageNumber) + 1}&perPage=10`);
  }, [selectedOption]);

  return (
    <>
      <h1>게시글 관리</h1>
      {(page && perPage && articleState) && (
        <>
          <Settings>
            <Button onClick={deleteHandler}>
              삭제하기
            </Button>
            {articleType
          && (
          <SelectBox
            options={boardType}
            defaultValue={articleType}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            width="20rem"
            type="register"
          />
          )}
          </Settings>
          {!totalPageState || !articleState
            ? (
              <EmptyField>등록된 게시글이 없습니다.</EmptyField>
            )
            : (
              <>
                <AdminTable
                  items={articleState}
                  setItems={setArticleState}
                />
                <div style={{
                  margin: 'auto', display: 'flex', justifyContent: 'center', maxWidth: '90rem',
                }}
                >
                  <Pagination
                    start={start}
                    handler={paginationHandler}
                    length={Number(totalPageState)}
                    show={Number(perPage)}
                  />
                </div>
              </>
            )}
        </>
      )}
    </>
  );
}
