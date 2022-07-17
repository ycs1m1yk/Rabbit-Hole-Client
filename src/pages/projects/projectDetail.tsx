/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, { MouseEvent, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import LogoImage from '@assets/images/rabbit-hole-logo-300.jpg';
import checkEmptyArray from '@utils/func';
import MarkdownViewer from '@/components/markdownViewer';
import { getProjectById } from '@/lib/projectApi';
import { ICommentProps, ITagsProps } from '@/interfaces/interface';
import MarkdownEditor from '@/components/markdownEditor';
import Button from '@/components/button';
import { S3URL } from '@utils/regex';

const ProjectDetailContainer = styled.div`
  padding: 3rem;
`;

const ProjectDetailHeader = styled.h1`
  font-size: 2.5rem;
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
  background-color: ${({ theme }) => theme.palette.borderGray};
  padding: 2rem;
  margin: 2rem 0;
  border-radius: 20px;
  width: 50%;
  align-self: ${(props) => (props.isMyComment ? 'flex-end' : 'flex-start')};
  background-color: ${(props) => (props.isMyComment ? props.theme.palette.lightViolet : props.theme.palette.borderGray)};
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
  background-color: ${({ theme }) => theme.palette.lightViolet};
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
  // const { authInfo: { userId } } = useToken();

  const projectId = searchParams.get('projectId');
  const params = { page: 1, perPage: 5 };
  let project;
  let comments;

  if (projectId) {
    const { data } = useQuery<any>(['projectDetail', projectId], () => getProjectById(projectId, params));
    if (data) {
      project = data.projectInfo;
      comments = data.commentList;
    }
  }
  // console.log(project);
  // console.log(comments);

  const handleBottomClick = (e: MouseEvent) => {
    if (e.pageY > 1000) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 2500, left: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return project && (
    <ProjectDetailContainer>
      <ProjectDetailHeader>프로젝트 상세</ProjectDetailHeader>
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
            checkEmptyArray(project.tags) ? null : (
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
      <ProjectDetailHeader>답글</ProjectDetailHeader>
      <ReplyWrapper>
        {comments.map((comment: ICommentProps) => (
          <ReplyContainer isMyComment={Math.random() > 0.5} key={comment._id}>
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
          </ReplyContainer>
        ))}
      </ReplyWrapper>
      <MarkdownEditor />
      <ButtonContainer>
        <Button onClick={() => console.log('답글 POST')}>답변하기</Button>
      </ButtonContainer>
      <GoToAnswer onClick={handleBottomClick}>Move</GoToAnswer>
    </ProjectDetailContainer>
  );
}

export default ProjectDetail;
