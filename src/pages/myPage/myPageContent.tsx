import { getAllArticle } from '@/lib/articleApi';
import { getAllProjects } from '@/lib/projectApi';
import { getMyPage } from '@/lib/userApi';
import React, { useEffect } from 'react';

interface IMyPageTypeProps {
  [index: string] : any;
  type: string;
}

const queryFn = {
  mypage: getMyPage(),
  projects: getAllProjects({}),
  articles: [
    getAllArticle({ articleType: 'question' }),
    getAllArticle({ articleType: 'free' }),
    getAllArticle({ articleType: 'study' }),
  ],
};

/*
  TODO
  - [O] type으로 관련 정보 불러오기 -> 개인정보, 프로젝트, 게시글 순으로 진행
  - [ ]
*/

function MyPageContent({ type }: IMyPageTypeProps) {
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
      const data = await getDataFromApi();
      console.log(data);
    }

    fetchData();
  }, [type]);

  return <div>MyPage content</div>;
}

export default MyPageContent;
