/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-underscore-dangle
import React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import { useQueryClient } from 'react-query';
import authAtom from '@/recoil/auth/authAtom';
import MarkdownViewer from '@/components/markdownViewer';
import Button from '@/components/button';
import * as styles from '@/pages/boardDetail/styled'
import { ICommentProps } from '@/interfaces/interface';
import { deleteCommentById, increaseCommentLikes } from '@/lib/commentApi';
import useToken from '@/hooks/useToken';

interface AnswerProps{
  comment: ICommentProps;
}

export default function Answer({ comment }: AnswerProps) {
  // const auth = React.useMemo(() => useRecoilValue(authAtom), [useRecoilValue(authAtom)]);
  const auth = useRecoilValue(authAtom);
  const { authInfo } = useToken();
  const queryClient = useQueryClient();

  const matchLike = React.useCallback(() => {
    const Likes = comment.likes.find((like) => like.userId === auth?.userId);
    return Likes;
  }, [comment, auth]);

  const handleUpdate = React.useCallback(() => {
  }, []);

  const handleDelete = React.useCallback(async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const res = await deleteCommentById(authInfo!.token, comment._id as string);
      if (res.status === 200) {
        queryClient.invalidateQueries();
      } else {
        alert('삭제에 실패하였습니다. 다시 시도해주세요:(');
        queryClient.invalidateQueries();
      }
    }
  }, []);

  const handleLike = React.useCallback(async () => {
    if (!authInfo) {
      alert('로그인해 주세요');
      return;
    }
    const { res } = await increaseCommentLikes(authInfo!.token, comment._id as string);
    queryClient.invalidateQueries();
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
        <styles.LikeBox onClick={handleLike} clicked={!!matchLike()}>
          {auth && matchLike()
            ? <AiFillHeart size={20} />
            : <AiOutlineHeart size={20} /> }
          <styles.LikeCount>{comment.likes.length}</styles.LikeCount>
        </styles.LikeBox>

        {auth && !comment.isAdopted && comment.authorId === auth.userId && (
          <styles.ButtonBox>
            <Button onClick={handleUpdate}>수정하기</Button>
            <Button onClick={handleDelete}>삭제하기</Button>
          </styles.ButtonBox>
        )}
      </styles.SubInfo>
    </styles.AnswerBox>
  );
}
