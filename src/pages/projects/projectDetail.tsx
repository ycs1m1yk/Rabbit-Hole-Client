import React from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import MarkdownViewer from '@/components/markdownViewer';
import { getProjectById } from '@/lib/projectApi';

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
`;

const ProjectAuthor = styled.div`
  font-size: 1.5rem;
`;

const ProjectTag = styled.span``;

const ProjectDescription = styled.div`
  font-size: 1.5rem;
`;

const ReplyContainer = styled.div`
  background-color: green;
`;

function ProjectDetail() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId');
  const params = { page: 1, perPage: 5 };
  let project;

  if (projectId) {
    const { data } = useQuery<any>(['projectDetail', projectId], () => getProjectById(projectId, params), {
      staleTime: 180000,
    });
    if (data) {
      project = data.projectInfo;
    }
  }
  console.log(project);

  return project && (
    <ProjectDetailContainer>
      <ProjectDetailHeader>프로젝트 상세</ProjectDetailHeader>
      <ProjectContentContainer>
        {project && <ProjectImage src={project.thumbnail} />}
        <ProjectInfo>
          <ProjectInfoTitle>제목</ProjectInfoTitle>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectInfoTitle>작성자</ProjectInfoTitle>
          <ProjectAuthor>{project.author}</ProjectAuthor>
          {project.tags.length > 0 ? <ProjectInfoTitle>태그</ProjectInfoTitle> : null}
          {project.tags.length > 0
            ? project.tags.map((tag: string) => <ProjectTag>{tag}</ProjectTag>) : null}
          <ProjectInfoTitle>프로젝트 한 줄 소개</ProjectInfoTitle>
          <ProjectAuthor>{project.shortDescription}</ProjectAuthor>
          <ProjectInfoTitle>프로젝트 상세</ProjectInfoTitle>
          <ProjectDescription>
            <MarkdownViewer text={project.description} />
          </ProjectDescription>
        </ProjectInfo>
      </ProjectContentContainer>
      <ReplyContainer>답글</ReplyContainer>
    </ProjectDetailContainer>
  );
}

export default ProjectDetail;
