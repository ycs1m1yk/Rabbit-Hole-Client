import React, { useEffect, useState } from 'react';

import { getAllArticle } from '@/lib/articleApi';
import { getAllProjects } from '@/lib/projectApi';
import { getMyPage } from '@/lib/userApi';
import { IArticleProps, IProjectProps, IUserProps } from '@/interfaces/interface';
import MyPageBoard from './components/MyPageBoard';
import MyPageProjects from './components/MyPageProjects';
import MyPageProfile from './components/MyPageProfile';

interface IMyPageTypeProps {
  [index: string] : any;
  token: string;
  type: string;
}

/*
  TODO
  - [O] type으로 관련 정보 불러오기 -> 개인정보, 프로젝트, 게시글 순으로 진행
  - [ ]
*/

function MyPageContainer({ token, type }: IMyPageTypeProps): any {
  const [data, setData] = useState<IUserProps | IProjectProps | IArticleProps[]>();

  const queryFn = {
    mypage: getMyPage(token),
    projects: getAllProjects({}),
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
      setData(response);
    }
    fetchData();
  }, [type]);

  switch (type) {
    case 'mypage':
      return data && <MyPageProfile data={data} />;
    case 'articles':
      return data && <MyPageBoard data={data} />;
    case 'projects':
      return data && <MyPageProjects data={data} />;
    case 'mentoring':
      return data && <MyPageProjects />;
    default:
      return <div>Default</div>;
  }
}

export default MyPageContainer;
