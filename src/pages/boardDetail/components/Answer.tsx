import React, { useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import authAtom from '@/recoil/auth/authAtom';
import MarkdownViewer from '@/components/markdownViewer';
import Button from '@/components/button';
import * as styles from '@/pages/boardDetail/styled'
import { ICommentProps } from '@/interfaces/interface';

interface AnswerProps{
  comment: ICommentProps;
}

export default function Answer({ comment }: AnswerProps) {
  // const auth = React.useMemo(() => useRecoilValue(authAtom), [useRecoilValue(authAtom)]);
  const auth = useRecoilValue(authAtom);
  const matchLike = React.useCallback(() => {
    const Likes = comment.likes.find((like) => like.userId === auth?.userId);
    return Likes;
  }, [comment, auth]);
  const handleUpdate = React.useCallback(() => {
  }, []);
  const handleDelete = React.useCallback(() => {
  }, []);

  return (
    <styles.AnswerBox>
      <styles.InfoHead>
        <styles.InfoHeadBox>
          <styles.ProfileBox>
            {comment.isAdopted && <BsFillBookmarkCheckFill size={30} />}
            <styles.Profile>{comment.author}</styles.Profile>
          </styles.ProfileBox>
          <styles.CreateDate>{comment.createdAt}</styles.CreateDate>
        </styles.InfoHeadBox>
      </styles.InfoHead>
      <styles.Main>
        <MarkdownViewer text={comment.content} />
      </styles.Main>
      <styles.SubInfo>
        <styles.LikeBox onClick={() => {}} clicked={!!matchLike()}>
          {auth && matchLike()
            ? <AiFillHeart size={20} />
            : <AiOutlineHeart size={20} /> }
          <styles.LikeCount>{comment.likes.length}</styles.LikeCount>
        </styles.LikeBox>

        {auth && !comment.isAdopted && comment.authorId === auth.userId && (
          <styles.ButtonBox>
            <Button onClick={() => { handleUpdate(); }}>수정하기</Button>
            <Button onClick={() => { handleDelete(); }}>삭제하기</Button>
          </styles.ButtonBox>
        )}
      </styles.SubInfo>
    </styles.AnswerBox>
  );
}
