/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import { getAllArticle } from '@/lib/articleApi';
import { getAllProjects } from '@/lib/projectApi';
import { getMyPage, getProjectByUserId } from '@/lib/userApi';
import { IArticleProps, IProjectProps, IUserProps } from '@/interfaces/interface';
import useToken from '@/hooks/useToken';
import MyPageBoard from './components/MyPageBoard';
import MyPageProjects from './components/MyPageProjects';
import MyPageProfile from './components/MyPageProfile';
import MyPageMentoring from './components/MyPageMentoring';

interface IMyPageTypeProps {
  [index: string] : any;
  type: string;
}

/*
  TODO
  - [O] type으로 관련 정보 불러오기 -> 개인정보, 프로젝트, 게시글 순으로 진행
  - [O] 개인정보수정 완료
  - [ ] 프로젝트 관리
  - [ ] 게시글 관리
*/

function MyPageContainer({ type }: IMyPageTypeProps): any {
  const [data, setData] = useState<IUserProps | IProjectProps | IArticleProps[]>();
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const { authInfo } = useToken();

  const params = { page: page + 1, perPage };
  console.log(params);

  const queryFn = {
    mypage: authInfo && getMyPage(authInfo?.token),
    projects: authInfo && getProjectByUserId(authInfo?.token, authInfo?.userId, params),
    articles: [
      getAllArticle({ articleType: 'question' }),
      getAllArticle({ articleType: 'free' }),
      getAllArticle({ articleType: 'study' }),
    ],
  };

  const getDataFromApi = () => {
    if (type === 'articles') {
      return Promise.all(
        queryFn[type].map(async (fn) => fn),
      );
    }
    return queryFn[type];
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getDataFromApi();
      console.log(response);
      setData(response);
    }
    fetchData();
  }, [type, page, perPage, setPage, setPerPage]);

  switch (type) {
    case 'mypage':
      return data && <MyPageProfile data={data} />;
    case 'articles':
      return data && <MyPageBoard page={page} perPage={perPage} setPage={setPage} setPerPage={setPerPage} data={data} />;
    case 'projects':
      return data && <MyPageProjects page={page} perPage={perPage} setPage={setPage} setPerPage={setPerPage} data={data} />;
    case 'mentoring':
      return data && <MyPageMentoring />;
    default:
      return <div>Default</div>;
  }
}

export default MyPageContainer;
