/* eslint-disable no-shadow */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import AdminTable from '@/components/adminTable';
import Loading from '@/components/loading';
import * as interfaces from '@interfaces/interface';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getAllArticle } from '@/lib/adminApi';
import useToken from '@/hooks/useToken';
import Pagination from '@components/pagination';

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
  const page = query.get('page');
  const perPage = query.get('perPage');
  const articleType = query.get('articleType');
  const queryParams = page && perPage && articleType ? { page, perPage, articleType } : { page: '1', perPage: '10', articleType: 'question' };
  const [articleState, setArticleState] = useState<any>();
  const { data } = useQuery(['admin', 'article'], async () => {
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
  }, { onSuccess: setArticleState });

  useEffect(() => {

  }, [data]);

  const deleteHandler = () => {
    console.log('fe');
  };

  const paginationHandler = (pageNumber:number) => {
    navigate(`/admin?type=articles&articleType=question&page=${Number(pageNumber) + 1}&perPage=10`);
  };
  
  return (
    <>
      <h1>게시글 관리</h1>
      {(page && perPage && articleState) && (
      <>
        <AdminTable
          items={articleState.articleList}
          setItems={setArticleState}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            start={Number(page)}
            handler={paginationHandler}
            length={articleState.totalPage}
            show={Number(perPage)}
          />
        </div>
      </>
      )}
    </>
  );
}
