/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React from 'react';
import { FaQuestion, FaCarrot } from 'react-icons/fa';
import { AiOutlineHeart, AiFillHeart, AiFillEye } from 'react-icons/ai';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQueryClient } from 'react-query';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import * as styles from '@pages/boardDetail/styled';
import authAtom from '@/recoil/auth/authAtom';
import MarkdownViewer from '@/components/markdownViewer';
import Button from '@/components/button';
import { IArticleProps, ICommentProps } from '@/interfaces/interface';
import useToken from '@/hooks/useToken';
import { deleteArticleById, increaseArticleLikes } from '@/lib/articleApi';
import modalAtom from '@/recoil/modal/modalAtom';

export interface ArticleProps{
  article: IArticleProps;
  comments: ICommentProps[];
}

export default function Article({ article, comments }: ArticleProps) {
  const setModalState = useSetRecoilState(modalAtom);
  const auth = useRecoilValue(authAtom);
  const [query] = useSearchParams();
  const articleId = query.get('id');
  const { authInfo } = useToken();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const adopted = React.useCallback(():boolean => {
    const adoptedData = comments.filter(({ isAdopted }) => (
      isAdopted === true
    ));
    return adoptedData.length > 0;
  }, [comments]);

  const handleModalOpen = React.useCallback(() => {
    setModalState('ArticleEdit');
  }, []);

  const matchLike = React.useCallback(() => {
    const Likes = article.likes?.find((like) => like.userId === auth?.userId);
    return Likes;
  }, [article, auth]);
  const handleDelete = React.useCallback(async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const res = await deleteArticleById(authInfo!.token, articleId as string);
      if (res.status === 200) {
        alert('삭제되었습니다.');
        navigate('/board');
      } else {
        res.data.then(({ reason }) => {
          alert(reason);
        });
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
              {article.articleType === 'question' && <FaQuestion size={30} />}
            </styles.ArticleIconBox>
            <styles.Title>{article.title}</styles.Title>
          </styles.TitleBox>
          <styles.InfoBox>
            <styles.Author><Link to={`/profile?id=${article.authorId}`}>{article.author}</Link></styles.Author>
            <styles.ViewBox>
              <AiFillEye />
              <styles.View>{`${article.views}회`}</styles.View>
            </styles.ViewBox>
            {article.articleType === 'question' && (
              <styles.CarrotBox>
                <FaCarrot />
                <styles.Carrot>{`${article.carrots} 개`}</styles.Carrot>
              </styles.CarrotBox>
            )}
            <styles.DateField>{article.createdAt.slice(0, 10)}</styles.DateField>
          </styles.InfoBox>
          {article.tags.length > 0 && (
            <styles.Tags>
              {article.tags.map((tag) => (
                <styles.Tag key={tag.name}>
                  <span>{tag.name}</span>
                </styles.Tag>
              ))}
            </styles.Tags>
          )}
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
          {auth && article.authorId === auth.userId && !adopted() && (
            <styles.ButtonBox>
              <Button onClick={handleModalOpen}>수정하기</Button>
              <Button onClick={handleDelete}>삭제하기</Button>
            </styles.ButtonBox>
          )}
        </styles.SubInfo>
      </styles.ArticleContainer>
    </styles.ArticleSection>
  );
}
