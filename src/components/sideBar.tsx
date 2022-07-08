// sideBar
import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  AiOutlineUser, AiOutlineEdit, AiOutlineTeam, AiOutlineProject,
} from 'react-icons/ai';

interface ContentProps{
    id:number,
    name: string,
    path: string,
    selected: boolean,
    icon?: ReactNode,
}

interface SideBarProps{
    type?: 'myPage' | 'board',
    contentsList?: ContentProps[],
}

const mypageList = [
  {
    id: 0,
    name: '게시글 관리',
    path: '/',
    selected: true,
    icon: <AiOutlineUser />,
  },
  {
    id: 1,
    name: '개인정보 수정',
    path: '/board',
    selected: false,
    icon: <AiOutlineEdit />,
  },
  {
    id: 2,
    name: '멘토링 관리',
    path: '/mentoring',
    selected: false,
    icon: <AiOutlineTeam />,
  },
  {
    id: 3,
    name: '프로젝트 관리',
    path: '/projects',
    selected: false,
    icon: <AiOutlineProject />,
  },
];
const boardListMock = [
  {
    id: 0,
    name: '질문 & 답변',
    path: '/',
    selected: true,
  },
  {
    id: 1,
    name: '자유게시판',
    path: '/',
    selected: false,
  },
  {
    id: 2,
    name: '스터디 모집',
    path: '/',
    selected: false,
  },
];

const Container = styled.aside`
    min-width: 130px;
    width: 100%;
    height: 100%;
    display: flex;
    border-right: 1px solid ${(props) => props.theme.palette.borderGray};
    justify-content: center;
`;

const List = styled.ul`
    width: 80%;
    height: 90%;
    list-style-type: disc;
`;

const BoardItem = styled.li<{selected: boolean}>`
    margin: 20px auto;
    height: 1rem;
    width: 50%;
    cursor: pointer;
    color: ${(props) => (props.selected ? props.theme.palette.eliceViolet : props.theme.palette.gray)};
    &:hover{
        font-size:1.05rem;
        color: ${(props) => props.theme.palette.eliceViolet};
    }
`;

const MyPageItem = styled.li<{selected: boolean}>`
    width: 100%;
    height: 30px;
    margin: 5px 0;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'EliceBold';
    color: ${(props) => (!props.selected ? props.theme.palette.black : 'white')};
    background-color: ${(props) => (props.selected ? props.theme.palette.eliceViolet : 'white')};
    &:hover{
        background-color: ${(props) => props.theme.palette.eliceViolet};
        color: white;
    }
`;

const defaultProps = {
  type: 'board',
  contentsList: [{
    id: 0,
    name: '콘텐츠 속성이 필요합니다.',
    path: '/',
    selected: false,
  }],
};

// contentList를 동적 생성 이후에 고려
export default function SideBar({ type, contentsList }:SideBarProps) {
  const navigate = useNavigate(); // 라우팅

  const contentsData = type === 'myPage' ? mypageList : boardListMock; // page타입에 따라 다른 리스트
  const [contents, setContents] = useState<ContentProps[]>(contentsData); // 리스트의 선택 상태 관리

  // 리스트 선택 시 selected상태 변경 및 라우팅
  const itemClickHandler = (event: React.MouseEvent<HTMLLIElement>, id: number, path: string) => {
    setContents(
      contents.map((content) => (content.id === id
        ? { ...content, selected: true }
        : { ...content, selected: false })),
    );
    navigate(path);
  };

  return (
    <Container>
      <List>
        {contents.map(({
          id, name, path, selected, icon,
        }) => {
          let item;
          if (type === 'board') {
            item = (
              <BoardItem // 게시판 리스트
                key={id}
                selected={selected}
                onClick={(e) => {
                  itemClickHandler(e, id, path);
                }}
              >
                {name}
              </BoardItem>
            );
          }
          if (type === 'myPage') {
            item = (
              <MyPageItem // 마이페이지 리스트
                key={id}
                selected={selected}
                onClick={(e) => {
                  itemClickHandler(e, id, path);
                }}
              >
                <div style={{ flex: '1', textAlign: 'center' }}>{icon}</div>
                <div style={{ flex: '2' }}>{name}</div>
              </MyPageItem>
            );
          }
          return item;
        })}
      </List>
    </Container>
  );
}

SideBar.defaultProps = defaultProps;
