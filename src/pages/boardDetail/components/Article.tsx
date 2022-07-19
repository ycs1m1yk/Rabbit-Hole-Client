/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
// eslint-disable-next-line no-alert
import React from 'react';
import { FaQuestion } from 'react-icons/fa';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import * as styles from '@pages/boardDetail/styled'
import authAtom from '@/recoil/auth/authAtom';
import MarkdownViewer from '@/components/markdownViewer';
import Button from '@/components/button';
import { IArticleProps } from '@/interfaces/interface';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useToken from '@/hooks/useToken';
import { deleteArticleById, increaseArticleLikes } from '@/lib/articleApi';

export interface ArticleProps{
  article: IArticleProps;
}

export default function Article({ article }: ArticleProps) {
  const auth = useRecoilValue(authAtom);
  const [query] = useSearchParams();
  const articleId = query.get('id');
  const { authInfo } = useToken();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const matchLike = React.useCallback(() => {
    const Likes = article.likes?.find((like) => like.userId === auth?.userId);
    return Likes;
  }, [article, auth]);

  const handleUpdate = React.useCallback(() => {
  }, []);

  const handleDelete = React.useCallback(async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const res = await deleteArticleById(authInfo!.token, articleId as string);
      if (res.result) {
        alert(res.reason);
        queryClient.invalidateQueries();
      }
      else {
        navigate('/board');
      }
    }
  }, []);

  const handleLike = React.useCallback(async () => {
    if (!authInfo) {
      alert('로그인해 주세요');
      return;
    }
    await increaseArticleLikes(authInfo!.token, articleId as string);
    queryClient.invalidateQueries();
  }, []);
  return (
    <styles.ArticleSection>
      <styles.ArticleContainer>
        <styles.InfoHead>
          <styles.TitleBox>
            <styles.ArticleIconBox>
              <FaQuestion size={30} />
            </styles.ArticleIconBox>
            <styles.Title>{article.title}</styles.Title>
          </styles.TitleBox>
          <styles.InfoBox>
            <styles.Author>{article.author}</styles.Author>
            <styles.DateField>{article.createdAt}</styles.DateField>
          </styles.InfoBox>
        </styles.InfoHead>
        <styles.Main>
          <MarkdownViewer text={article.content} />
        </styles.Main>
        <styles.SubInfo>
          <styles.LikeBox onClick={handleLike} clicked={!!matchLike()}>
            {auth && matchLike()
              ? <AiFillHeart size={20} />
              : <AiOutlineHeart size={20} /> }
            <styles.LikeCount>{article.likes ? article.likes.length : 0}</styles.LikeCount>
          </styles.LikeBox>
          {auth && article.authorId === auth.userId && (
            <styles.ButtonBox>
              <Button onClick={handleUpdate}>수정하기</Button>
              <Button onClick={handleDelete}>삭제하기</Button>
            </styles.ButtonBox>
          )}
        </styles.SubInfo>
      </styles.ArticleContainer>
    </styles.ArticleSection>
  );
}
