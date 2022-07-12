import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaQuestion } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
// import { getArticleById } from '@/lib/api';

import MarkdownViewer from '@/components/markdownViewer';
import MarkdownEditor from '@/components/markdownEditor';
import Button from '@/components/button';

const Container = styled.main`
  min-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

const ArticleSection = styled.section`
  width: 100vw;
  min-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnswerSection = styled.section`
  width: 100vw;
  min-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F8F9FA;
  padding: 4rem 0;
`;

const ArticleContainer = styled.div`
  width: 1000px;
  padding: 4rem 2rem;

`;
const ArticleIconBox = styled.div`
  margin-left: -10px;
  color: ${({ theme }) => theme.palette.lightViolet};
`;

const InfoHead = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderGray};
`;

const TitleBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.palette.black};
  border-bottom: none;
  padding: 0;
  
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`;

const Author = styled.span`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.palette.black};
`;
const DateField = styled.span`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.palette.gray};
`;

const Main = styled.div`
  width: 100%;
  padding: 2rem 1rem;
`;

const SubInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
`;

const LikeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.palette.gray};
  border: 1px solid ${({ theme }) => theme.palette.borderGray};
  border-radius: 10px;
  padding: 0.5rem 1rem ;
`;

const LikeCount = styled.span`
  font-size: 14px;
  vertical-align: middle;
`;

const AnswerBox = styled.div`
  width: 1000px;
  padding: 2rem;
  background-color: #FFFF;
  border: 1px solid ${({ theme }) => theme.palette.borderGray};
  box-shadow: 4px 4px 10px ${({ theme }) => theme.palette.borderGray};
  margin-bottom: 4rem;
`;

const InfoHeadBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const ProfileBox = styled.div`
  color: ${({ theme }) => theme.palette.lightViolet};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// const Rank = styled(Author)`
//   font-size: 12px;
//   color: ${({ theme }) => theme.palette.gray};
// `;

const Profile = styled(Author)`
  font-size: 18px;
  font-weight: 700;
`;

const CreateDate = styled(DateField)`
  font-size: 12px;
  color: ${({ theme }) => theme.palette.gray};
`;

interface articleInterface{
  _id: string;
  articleType: string;
  author: string;
  authorId: string;
  title: string;
  content: string;
  carrots: number;
  likes: number;
  createdAt: string;
}

interface ArticleProps{
  article: articleInterface;
}

function Article({ article }:ArticleProps) {
  const handleUpdate = React.useCallback(() => {

  }, []);
  const handleDelete = React.useCallback(() => {

  }, []);
  return (
    <ArticleSection>
      <ArticleContainer>
        <InfoHead>
          <TitleBox>
            <ArticleIconBox>
              <FaQuestion size={30} />
            </ArticleIconBox>
            <Title>{article.title}</Title>
          </TitleBox>
          <InfoBox>
            <Author>{article.author}</Author>
            <DateField>{article.createdAt}</DateField>
          </InfoBox>
        </InfoHead>
        <Main>
          <MarkdownViewer text={article.content} />
        </Main>
        <SubInfo>
          <LikeBox>
            <AiOutlineHeart size={20} />
            <LikeCount>{article.likes}</LikeCount>
          </LikeBox>
          <ButtonBox>
            <Button onClick={() => { handleUpdate(); }}>수정하기</Button>
            <Button onClick={() => { handleDelete(); }}>삭제하기</Button>
          </ButtonBox>
        </SubInfo>
      </ArticleContainer>
    </ArticleSection>
  );
}

interface commentInterface{
  _id: string;
  author: string;
  authorId: string;
  content: string;
  likes: number;
  isAdopted: boolean
  createdAt: string;
}

interface AnswerProps{
  comment: commentInterface;
}

function Answer({ comment }:AnswerProps) {
  const handleUpdate = React.useCallback(() => {

  }, []);
  const handleDelete = React.useCallback(() => {

  }, []);

  return (
    <AnswerBox>
      <InfoHead>
        <InfoHeadBox>
          <ProfileBox>
            { comment.isAdopted && <BsFillBookmarkCheckFill size={30} />}
            <Profile>{comment.author}</Profile>
          </ProfileBox>
          <CreateDate>{comment.createdAt}</CreateDate>
        </InfoHeadBox>
      </InfoHead>
      <Main>
        <MarkdownViewer text={comment.content} />
      </Main>
      <SubInfo>
        <LikeBox>
          <AiOutlineHeart size={20} />
          <LikeCount>{comment.likes}</LikeCount>
        </LikeBox>
        <ButtonBox>
          <Button onClick={() => { handleUpdate(); }}>수정하기</Button>
          <Button onClick={() => { handleDelete(); }}>삭제하기</Button>
        </ButtonBox>
      </SubInfo>
    </AnswerBox>
  );
}

export default function BoardDetail() {
  const [query] = useSearchParams();
  const id = query.get('id');
  const [article, setArticle] = useState<articleInterface>({});
  const [comments, setComments] = useState<commentInterface[]>([]);
  useEffect(() => {
    const articleData = {
      _id: 'adfasdfs',
      articleType: 'question',
      author: '엘리레이서',
      authorId: '62b3173471aa3d5a99e31468',
      title: '글제목ㅁㅇㄻㅇㄻㄴㅇㄻㄴㅇㄻㅇㄹ',
      content: '### Hello',
      carrots: 100,
      likes: 10,
      createdAt: '2020.07.01',
    };
    const commentData = [
      {
        _id: 'asdfasd',
        author: 'asdfasf',
        authorId: 'sdvoane',
        content: 'wow',
        likes: 12,
        isAdopted: false,
        createdAt: '2020.07.05',
      },
      {
        _id: 'asdfasfasd',
        author: 'asdfasf',
        authorId: 'sdvoane',
        content: 'wow',
        likes: 12,
        isAdopted: false,
        createdAt: '2020.07.05',
      },
      {
        _id: 'asdffdasd',
        author: 'asdfasf',
        authorId: 'sdvoane',
        content: 'wow',
        likes: 12,
        isAdopted: false,
        createdAt: '2020.07.05',
      },
      {
        _id: 'asdfsdsadasd',
        author: 'asdfasf',
        authorId: 'sdvoane',
        content: 'wow',
        likes: 12,
        isAdopted: false,
        createdAt: '2020.07.05',
      },
    ];
    // const articleDataa = getArticleById(id);
    setArticle(articleData);
    setComments(commentData);
  }, [id]);
  console.log(article);
  console.log(comments);
  return (
    <Container>
      {Object.keys(article).length !== 0 && <Article article={article} />}
      <AnswerSection>
        {comments.length > 0 ? comments.map((comment) => (
          // eslint-disable-next-line no-underscore-dangle
          <Answer key={comment._id} comment={comment} />
        )) : null}
        <AnswerBox>
          <InfoHead>
            <InfoHeadBox>
              <ProfileBox>
                <Profile>엘리쑥갓님 답변해주세요</Profile>
              </ProfileBox>
            </InfoHeadBox>
          </InfoHead>
          <Main>
            <MarkdownEditor />
          </Main>
          <SubInfo>
            <Button onClick={() => {}}>답변하기</Button>
          </SubInfo>
        </AnswerBox>
      </AnswerSection>
    </Container>
  );
}
