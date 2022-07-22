/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, {
  useEffect,
  useRef, useState,
} from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoImage from '@assets/images/rabbit-hole-logo-300.jpg';
import { isEmptyArray } from '@utils/func';
import { Editor } from '@toast-ui/react-editor';
import { useSetRecoilState } from 'recoil';
import {
  AiFillHeart, AiOutlineEye, AiOutlineHeart,
} from 'react-icons/ai';
import { lighten } from 'polished';
import MarkdownViewer from '@/components/markdownViewer';
import {
  deleteProjectById, getProjectById, getProjectViewsById, increaseProjectLikes,
} from '@/lib/projectApi';
import { ICommentProps, ITagsProps } from '@/interfaces/interface';
import MarkdownEditor from '@/components/markdownEditor';
import Button from '@/components/button';
import useToken from '@/hooks/useToken';
import { deleteCommentById, postComment } from '@/lib/commentApi';
import modalAtom from '@/recoil/modal/modalAtom';
import { ModalTypes } from '@/interfaces/type';

const ProjectDetailContainer = styled.div`
  max-width: 1000px;
  padding: 5rem;
  margin-left: auto;
  margin-right: auto;
`;

const ProjectDetailHeader = styled.h1`
  font-size: 2.5rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const ProjectDataContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const EditButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const ProjectContentContainer = styled.div`
  width: 100%;
  height: 35rem;
  margin: 2rem 0;
  display: grid;
  grid-template-columns: 40% 60%;
`;

const ProjectImageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProjectImage = styled.img`
  width: 80%;
  max-height: 350px;
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

const AuthorLink = styled(Link)`
  &:hover {
    color: ${({ theme }) => theme.palette.lightViolet}
  }
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
  background-color: ${(props) => (props.isMyComment ? lighten(0.5, props.theme.palette.eliceViolet) : props.theme.palette.borderGray)};
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

const LikeBox = styled.button<{ isClicked:boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid ${({ theme }) => theme.palette.borderGray};
  border-radius: 10px;
  padding: 0.5rem 1rem ;
`;

const LikeCount = styled.span`
  font-size: 14px;
  vertical-align: middle;
`;

const ViewContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const ViewCount = styled.span`
  font-size: 1.8rem;
  margin-left: 0.5rem;
`;

const ProjectDescriptionBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 4rem;
`;

function ProjectDetail() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { authInfo } = useToken();
  const editorRef = useRef<Editor>(null);
  const setModal = useSetRecoilState(modalAtom);
  const [clicked, setClicked] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [views, setViews] = useState<number>(0);

  const projectId = searchParams.get('projectId');
  let project: any;
  let comments;
  let authorId;

  // data fetching and initializing
  if (projectId) {
    const { data } = useQuery<any>(['projectDetail', projectId], () => getProjectById(projectId), {
      enabled: !!projectId,
      refetchOnWindowFocus: false,
      suspense: true,
    });

    if (data) {
      project = data.projectInfo;
      comments = data.commentList;
      authorId = data.projectInfo.authorId;
    }
  }

  // 댓글 POST
  const handleCommentPost = React.useCallback(async () => {
    try {
      const content = editorRef.current?.getInstance().getMarkdown();
      const postParams = { commentType: 'project', content };
      await postComment(authInfo!.token, projectId as string, postParams);
      queryClient.invalidateQueries(['projectDetail', projectId]);
    } catch (e: any) {
      alert('문제가 발생했습니다. 다시  시도해주세요:(');
    }
  }, []);

  // 프로젝트 삭제
  const handleProjectDelete = React.useCallback(async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const response = await deleteProjectById(authInfo!.token, projectId as string);
      const resp = await response.data;
      if (response.status === 200) {
        navigate('/projects?filter=date&page=1&perPage=8');
      } else {
        alert(resp.reason);
      }
      queryClient.invalidateQueries(['projectDetail', projectId]);
    }
  }, []);

  // 프로젝트 수정
  const handleProjectEdit = React.useCallback(async (modalType: ModalTypes) => {
    setModal(modalType);
  }, []);

  // 댓글 삭제
  const handleCommentDelete = React.useCallback(async (commentId: string) => {
    const response = await deleteCommentById(authInfo!.token, commentId);
    const resp = await response.data;
    if (response.status !== 200) {
      alert(resp.reason);
    }
    queryClient.invalidateQueries(['projectDetail', projectId]);
  }, []);

  // 좋아요 눌렀는지 체크
  const matchLike = React.useCallback(() => {
    const Likes = project.likes?.find((like: any) => like.userId === authInfo?.userId);
    return Likes;
  }, [project, authInfo]);

  const handleToggleLike = React.useCallback(async () => {
    if (!authInfo) {
      alert('회원가입을 진행해주세요:)');
      return;
    }
    setClicked((prev) => !prev);
    const response = await increaseProjectLikes(authInfo!.token, projectId as string);
    if (response.status !== 200) {
      alert('좋아할 수 없어요.. 다시 시도해주세요:(');
    }
    queryClient.invalidateQueries(['projectDetail', projectId]);
  }, [clicked]);

  useEffect(() => {
    const getProjectViews = async () => {
      const response = await getProjectViewsById(projectId);
      setViews(response);
    };
    getProjectViews();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  }, [projectId]);

  return project && (
    <ProjectDetailContainer>
      <ProjectDetailHeader>
        <HeaderContainer>
          {project.title}
          <ProjectDataContainer>
            <LikeBox isClicked={clicked} onClick={handleToggleLike}>
              {authInfo && matchLike()
                ? <AiFillHeart color="red" size={20} />
                : <AiOutlineHeart size={20} /> }
              <LikeCount>{project.likes ? project.likes.length : 0}</LikeCount>
            </LikeBox>
            <ViewContainer>
              <AiOutlineEye size={30} />
              <ViewCount>{views.toLocaleString()}</ViewCount>
            </ViewContainer>
          </ProjectDataContainer>
        </HeaderContainer>
      </ProjectDetailHeader>
      <ProjectContentContainer>
        {project.thumbnail.includes(`${import.meta.env.VITE_API_S3_URL}`)
          ? (
            <ProjectImageBox>
              <ProjectImage src={project.thumbnail} />
            </ProjectImageBox>
          )
          : (
            <ProjectImageBox>
              <ProjectImage width={300} height={300} src={LogoImage} />
            </ProjectImageBox>
          )}
        <ProjectInfo>
          <ProjectInfoTitle>제목</ProjectInfoTitle>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectInfoTitle>작성자</ProjectInfoTitle>
          <ProjectAuthor><AuthorLink to={`/profile?id=${project.authorId}`}>{project.author}</AuthorLink></ProjectAuthor>
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
        </ProjectInfo>
      </ProjectContentContainer>
      {
        !isVisible && (
        <>
          <ProjectDescriptionBox>
            <ProjectInfoTitle>프로젝트 상세</ProjectInfoTitle>
            <ProjectDescription>
              <MarkdownViewer text={project.description} />
            </ProjectDescription>
          </ProjectDescriptionBox>

          {authorId === authInfo?.userId && (
          <EditButtonContainer>
            <Button onClick={() => handleProjectEdit('ProjectEdit')}>수정하기</Button>
            <Button onClick={handleProjectDelete}>삭제하기</Button>
          </EditButtonContainer>
          )}

          <ProjectDetailHeader>
            댓글(
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
                    <AuthorLink to={`/profile?id=${comment.authorId}`}>{comment.author}</AuthorLink>
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
        </>
        )
      }
      {
        authInfo && (
        <>
          <MarkdownEditor isVisible={isVisible} ref={editorRef} />
          <ButtonContainer>
            <Button onClick={handleCommentPost}>답변하기</Button>
          </ButtonContainer>
        </>
        )
      }

    </ProjectDetailContainer>
  );
}

export default ProjectDetail;
