/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, {
  MouseEvent, useEffect, useRef, useState,
} from 'react';
import { useQuery } from 'react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoImage from '@assets/images/rabbit-hole-logo-300.jpg';
import { isEmptyArray } from '@utils/func';
import MarkdownViewer from '@/components/markdownViewer';
import { deleteProjectById, getProjectById } from '@/lib/projectApi';
import { ICommentProps, ITagsProps } from '@/interfaces/interface';
import MarkdownEditor from '@/components/markdownEditor';
import Button from '@/components/button';
import { S3URL } from '@utils/regex';
import useToken from '@/hooks/useToken';
import { Editor } from '@toast-ui/react-editor';
import { deleteCommentById, postComment } from '@/lib/commentApi';
import ProjectForm from '@/components/forms/projectForm';
import useModal from '@/hooks/useModal';
import modalAtom from '@/recoil/modal/modalAtom';
import { useSetRecoilState } from 'recoil';
import { ModalTypes } from '@/interfaces/type';

const ProjectDetailContainer = styled.div`
  padding: 3rem;
`;

const ProjectDetailHeader = styled.h1`
  font-size: 2.5rem;
`;

const EditButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const ProjectContentContainer = styled.div`
  width: 100%;
  height: 50rem;
  margin: 2rem 0;
  display: grid;
  grid-template-columns: 30% 70%;
`;

const ProjectImage = styled.img`
  width: 80%;
`;

const ProjectInfo = styled.div`
  overflow-y: auto;
`;

const ProjectInfoTitle = styled.h2`
  margin: 2rem 0;
`;

const ProjectTitle = styled.div`
  font-size: 1.5rem;
  margin-left: 1rem;
`;

const ProjectAuthor = styled.div`
  font-size: 1.5rem;
  margin-left: 1rem;
`;

const ProjectTagConatiner = styled.div`
`;

const ProjectTag = styled.span`
  background-color: ${({ theme }) => theme.palette.lightViolet};
  padding: 0.5rem;
  border-radius: 5px;
  color: white;
  margin-left: 1rem;

`;

const ProjectDescription = styled.div`
  font-size: 1.5rem;
  margin-left: 1rem;
`;

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReplyContainer = styled.div<{isMyComment: boolean}>`
  padding: 2rem;
  margin: 2rem 0;
  border-radius: 20px;
  width: 50%;
  align-self: ${(props) => (props.isMyComment ? 'flex-end' : 'flex-start')};
  /* background-color: ${(props) => (props.isMyComment ? props.theme.palette.lightViolet : props.theme.palette.borderGray)}; */
  /* color: ${(props) => (props.isMyComment ? 'white' : 'black')}; */
  background-color: ${(props) => (props.theme.palette.borderGray)};
`;

const ReplyHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ReplyAuthor = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ReplyDate = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const GoToAnswer = styled.div`
  background-color: ${({ theme }) => theme.palette.gray};
  border-radius: 50%;
  position: fixed;
  width: 5rem;
  height: 5rem;
  bottom: 50%;
  right: 3%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
`;

function ProjectDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { authInfo } = useToken();
  const editorRef = useRef<Editor>(null);
  const moveRef = useRef<null | HTMLDivElement>(null);
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const setModal = useSetRecoilState(modalAtom);

  const projectId = searchParams.get('projectId');
  let project;
  let comments;
  let authorId;

  if (projectId) {
    const { data } = useQuery<any>(['projectDetail', projectId], () => getProjectById(projectId));

    if (data) {
      project = data.projectInfo;
      comments = data.commentList;
      authorId = data.projectInfo.authorId;
    }
  }

  const [flag, setFlag] = useState<number>(0);

  // Page view 맨 아래, 맨 위로 이동
  const handleBottomClick = (e: MouseEvent) => {
    if (e.pageY > 1000) {
      // 맨 위로 이동
      window.scrollTo({ top: 0, behavior: 'smooth' });
      moveRef.current!.innerText = 'Down';
    } else {
      // 맨 아래로 이동
      scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      moveRef.current!.innerText = 'Up';
    }
  };

  // 댓글 POST
  const handleCommentPost = async () => {
    try {
      const content = editorRef.current?.getInstance().getMarkdown();
      const postParams = { commentType: 'project', content };
      await postComment(authInfo!.token, projectId as string, postParams);

      window.location.reload();
      setFlag((prev) => prev + 1);
    } catch (e: any) {
      alert('문제가 발생했습니다. 다시  시도해주세요:(');
    }
  };

  // 프로젝트 삭제
  const handleProjectDelete = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const response = await deleteProjectById(authInfo!.token, projectId as string);
      if (response.status === 200) {
        navigate('/projects?filter=date&page=1&perPage=8');
      } else {
        alert('삭제에 실패하였습니다. 다시 시도해주세요:(');
        window.location.reload();
      }
    }
  };

  // 프로젝트 수정
  const handleProjectEdit = async (modalType: ModalTypes) => {
    setModal(modalType);
  };

  // 댓글 삭제
  const handleCommentDelete = async (commentId: string) => {
    const response = await deleteCommentById(authInfo!.token, commentId);
    if (response.status !== 200) {
      alert('댓글 삭제 오류가 발생하였습니다. 다시 시도해주세요:(');
    }
    window.location.reload();
  };

  useEffect(() => {
  }, [flag]);

  return project && (
    <ProjectDetailContainer ref={scrollRef}>
      <ProjectDetailHeader>
        프로젝트 상세
      </ProjectDetailHeader>
      <ProjectContentContainer>
        {project.thumbnail.includes(S3URL)
          ? <ProjectImage src={project.thumbnail} />
          : <ProjectImage width={300} height={300} src={LogoImage} />}
        <ProjectInfo>
          <ProjectInfoTitle>제목</ProjectInfoTitle>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectInfoTitle>작성자</ProjectInfoTitle>
          <ProjectAuthor>{project.author}</ProjectAuthor>
          {
            isEmptyArray(project.tags) ? null : (
              <ProjectTagConatiner>
                <ProjectInfoTitle>태그</ProjectInfoTitle>
                {project.tags.map((tag: ITagsProps, i: number) => <ProjectTag key={String(i) + tag.name}>{tag.name}</ProjectTag>)}
              </ProjectTagConatiner>
            )
          }
          <ProjectInfoTitle>프로젝트 한 줄 소개</ProjectInfoTitle>
          <ProjectAuthor>{project.shortDescription}</ProjectAuthor>
          <ProjectInfoTitle>프로젝트 상세</ProjectInfoTitle>
          <ProjectDescription>
            <MarkdownViewer text={project.description} />
          </ProjectDescription>
        </ProjectInfo>
      </ProjectContentContainer>
      {authorId === authInfo?.userId && (
      <EditButtonContainer>
        <Button onClick={() => handleProjectEdit('Register')}>수정하기</Button>
        <Button onClick={handleProjectDelete}>삭제하기</Button>
      </EditButtonContainer>
      )}
      <ProjectDetailHeader>
        답글(
        {comments.length}
        개)
      </ProjectDetailHeader>
      <ReplyWrapper>
        {comments.map((comment: ICommentProps) => (
          <ReplyContainer isMyComment={authInfo?.userId === comment.authorId} key={comment._id}>
            <ReplyHeader>
              <ReplyAuthor>
                작성자:
                {' '}
                {comment.author}
              </ReplyAuthor>
              <ReplyDate>
                {comment.createdAt.slice(0, 10)}
              </ReplyDate>
            </ReplyHeader>
            <MarkdownViewer text={comment.content} />
            {
              authInfo?.userId === comment.authorId && (
              <ButtonContainer>
                <Button size="small" onClick={() => handleCommentDelete(comment._id)}>삭제</Button>
              </ButtonContainer>
              )
            }
          </ReplyContainer>
        ))}
      </ReplyWrapper>
      <MarkdownEditor ref={editorRef} />
      <ButtonContainer>
        <Button onClick={handleCommentPost}>답변하기</Button>
      </ButtonContainer>
      <GoToAnswer ref={moveRef} onClick={handleBottomClick}>Move</GoToAnswer>
    </ProjectDetailContainer>
  );
}

export default ProjectDetail;
