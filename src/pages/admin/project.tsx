/* eslint-disable no-shadow */
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import AdminTable from '@/components/adminTable';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { deleteProject, getAllProjects } from '@/lib/adminApi';
import useToken from '@/hooks/useToken';
import Pagination from '@components/pagination';
import Button from '@/components/button';

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

interface UserProps{
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

export default function AdmiProject() {
  const { authInfo } = useToken();
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const page = query.get('page') || '1';
  const perPage = query.get('perPage') || '10';
  const queryParams = page && perPage ? { page, perPage } : { page: '1', perPage: '10' };
  const [projectState, setProjectState] = useState<UserProps[]>();
  const [totalPageState, setTotalPageState] = useState<string>();

  const { data } = useQuery(['admin', 'projects', page, perPage], async () => {
    let newProjects;
    if (authInfo && queryParams) {
      newProjects = await getAllProjects(authInfo.token, queryParams);
      newProjects.projectList = newProjects.projectList.map(({
        _id,
        title,
        author,
        createdAt,
        thumbnail,
      }:{
        _id: string,
        title: string,
        author:string,
        createdAt: string,
        thumbnail:string,
      }) => ({
        type: 'project',
        _id,
        title,
        author,
        thumbnail,
        createdAt: new Date(createdAt),
        selected: false,
        path: `/projects/detail?projectId=${_id}`,
      }));
    }
    return newProjects;
  }, {
    onSuccess(data) {
      setProjectState(data.projectList);
      setTotalPageState(data.totalPage);
    },
  });

  const deleteHandler = useCallback(async () => {
    if (authInfo && projectState) {
      if (confirm('?????? ?????????????????????????')) { // ?????? ?????????
        try {
          const res = await Promise.all(projectState.map(async (project) => {
            if (project.selected) await deleteProject(authInfo?.token, project._id);
          }));
        } catch (error) {
          alert('???????????? ????????? ??????????????????. ?????? ??????????????????:(');
        }
        navigate('/admin?type=projects&page=1&perPage=10');
      }
    } else {
      alert('????????? ????????? ????????????.');
      navigate('/');
    }
  }, [authInfo, projectState]);

  // ??????????????????
  const paginationHandler = useCallback((pageNumber:number) => {
    navigate(`/admin?type=projects&page=${Number(pageNumber) + 1}&perPage=10`);
  }, []);

  return (
    <>
      <h1>???????????? ??????</h1>
      {(page && perPage && projectState) && (
        <>
          <Settings>
            <Button onClick={deleteHandler}>
              ????????????
            </Button>
          </Settings>
          {
            !totalPageState || !projectState ? (
              <EmptyField>????????? ???????????? ????????????.</EmptyField>
            )
              : (
                <>
                  <AdminTable
                    items={projectState}
                    setItems={setProjectState}
                  />
                  <div style={{
                    margin: 'auto', display: 'flex', justifyContent: 'center', maxWidth: '90rem',
                  }}
                  >
                    <Pagination
                      start={Number(page) - 1}
                      handler={paginationHandler}
                      length={Number(totalPageState)}
                      show={Number(perPage)}
                    />
                  </div>
                </>
              )
}
        </>
      )}
    </>
  );
}
