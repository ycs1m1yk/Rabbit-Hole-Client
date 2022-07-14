import React from 'react';
import { FaQuestion } from 'react-icons/fa';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import * as styles from '@pages/boardDetail/styled'
import authAtom from '@/recoil/auth/authAtom';
import MarkdownViewer from '@/components/markdownViewer';
import Button from '@/components/button';
import { IArticleProps } from '@/interfaces/interface';

export interface ArticleProps{
  article: IArticleProps;
}

export default function Article({ article }: ArticleProps) {
  // const auth = React.useMemo(() => useRecoilValue(authAtom), [useRecoilValue(authAtom)]);
  const auth = useRecoilValue(authAtom);
  const convertDateFormat = React.useCallback((date:Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthData = month >= 10 ? month : `0${month}`;
    const day = date.getDate();
    const dayData = day >= 10 ? day : `0${day}`;
    return [year, monthData, dayData].join('/');
  }, []);
  const matchLike = React.useCallback(() => {
    const Likes = article.likes?.find((like) => like.userId === auth?.userId);
    return Likes;
  }, [article, auth]);
  const handleUpdate = React.useCallback(() => {
  }, []);
  const handleDelete = React.useCallback(() => {
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
            <styles.DateField>{convertDateFormat(article.createdAt)}</styles.DateField>
          </styles.InfoBox>
        </styles.InfoHead>
        <styles.Main>
          <MarkdownViewer text={article.content} />
        </styles.Main>
        <styles.SubInfo>
          <styles.LikeBox onClick={() => {}} clicked={!!matchLike()}>
            {auth && matchLike()
              ? <AiFillHeart size={20} />
              : <AiOutlineHeart size={20} /> }
            <styles.LikeCount>{article.likes ? article.likes.length : 0}</styles.LikeCount>
          </styles.LikeBox>
          <styles.ButtonBox>
            <Button onClick={() => { handleUpdate(); }}>수정하기</Button>
            <Button onClick={() => { handleDelete(); }}>삭제하기</Button>
          </styles.ButtonBox>
        </styles.SubInfo>
      </styles.ArticleContainer>
    </styles.ArticleSection>
  );
}
