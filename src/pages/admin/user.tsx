/* eslint-disable no-shadow */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import AdminTable from '@/components/adminTable';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { deleteUser, getAllUsers } from '@/lib/adminApi';
import useToken from '@/hooks/useToken';
import Pagination from '@components/pagination';
import Button from '@/components/button';
import SelectBox from '@/components/selectBox';

const roleType = [
  'admin', 'racer', 'guest',
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

export default function AdminUser() {
  const { authInfo } = useToken();
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const page = query.get('page') || '1';
  const perPage = query.get('perPage') || '10';
  const role = query.get('role') || 'guest';
  const queryParams = page && perPage && role ? { page, perPage, role } : { page: '1', perPage: '10', role: 'guest' };
  const [userState, setUserState] = useState<UserProps[]>();
  const [totalPageState, setTotalPageState] = useState<string>();
  const [selectedOption, setSelectedOption] = useState(role);

  const { data } = useQuery(['admin', 'users', page, perPage, role], async () => {
    let newUsers;
    if (authInfo && queryParams) {
      newUsers = await getAllUsers(authInfo.token, queryParams);
      console.log(newUsers);
      newUsers.userList = newUsers.userList.map(({
        _id, avatar, name, email, track, trackCardinalNumber, position, createdAt, authImage,
      }:{
        _id: string,
        avatar: string,
        name: string,
        email: string,
        track: string,
        trackCardinalNumber:number,
        position:string,
        role:string,
        createdAt:string,
        authImage: string,
      }) => ({
        type: 'user',
        _id,
        authImage,
        avatar,
        name,
        email,
        track,
        trackCardinalNumber,
        position,
        role,
        createdAt: new Date(createdAt),
        selected: false,
      }));
    }
    console.log(newUsers);
    return newUsers;
  }, {
    onSuccess(data) {
      console.log(data);
      setUserState(data.userList);
      setTotalPageState(data.totalPage);
    },
  });

  useEffect(() => {
    navigate(`/admin?type=users&role=${selectedOption}&page=1&perPage=10`);
  }, [selectedOption]);

  const deleteHandler = useCallback(async () => {
    if (authInfo && userState) {
      if (confirm('정말 삭제하시겠습니까?')) {
        try {
          const res = await Promise.all(userState.map(async (user) => {
            if (user.selected) await deleteUser(authInfo?.token, user._id);
          }));
        } catch (error) {
          alert('유저 삭제가 실패했습니다. 다시 시도해주세요:(');
        }
        navigate(`/admin?type=users&role=${selectedOption}&page=1&perPage=10`);
        window.location.reload();
      }
    } else {
      alert('관리자 권한이 없습니다.');
      navigate('/');
    }
  }, [selectedOption, authInfo, userState]);

  const paginationHandler = useCallback((pageNumber:number) => {
    navigate(`/admin?type=users&role=${selectedOption}&page=${Number(pageNumber) + 1}&perPage=10`);
  }, [selectedOption]);

  return (
    <>
      <h1>유저 관리</h1>
      {(page && perPage && userState) && (
        <>
          <Settings>
            <Button onClick={deleteHandler}>
              삭제하기
            </Button>
            {role
          && (
          <SelectBox
            options={roleType}
            defaultValue={role}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            width="20rem"
            type="register"
          />
          )}
          </Settings>
          {
            !totalPageState || !userState ? (
              <EmptyField>등록된 게시글이 없습니다.</EmptyField>
            )
              : (
                <>
                  <AdminTable
                    items={userState}
                    setItems={setUserState}
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
