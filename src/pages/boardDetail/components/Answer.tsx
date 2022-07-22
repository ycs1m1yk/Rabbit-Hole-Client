/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-underscore-dangle
import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsFillBookmarkCheckFill, BsBookmarkCheck } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import { useQueryClient } from 'react-query';
import { Editor, Viewer } from '@toast-ui/react-editor';
import { Link } from 'react-router-dom';
import authAtom from '@/recoil/auth/authAtom';
import MarkdownViewer from '@/components/markdownViewer';
import Button from '@/components/button';
import * as styles from '@/pages/boardDetail/styled';
import { ICommentProps, IArticleProps } from '@/interfaces/interface';
import {
  adoptComment, deleteCommentById, increaseCommentLikes, updateCommentById,
} from '@/lib/commentApi';
import useToken from '@/hooks/useToken';
import MarkdownEditor from '@/components/markdownEditor';

interface AnswerProps{
  comment: ICommentProps;
  toggleAnswerBox: boolean;
  setToggleAnswerBox: React.Dispatch<React.SetStateAction<boolean>>;
  article: IArticleProps;
}

export default function Answer({
  comment, setToggleAnswerBox, toggleAnswerBox, article,
}: AnswerProps) {
  const auth = useRecoilValue(authAtom);
  const { authInfo } = useToken();
  const queryClient = useQueryClient();
  const updateEditor = React.useRef<Editor>(null);
  const viewer = React.useRef<Viewer>(null);
  const [update, setUpdate] = useState<boolean>(false);
  // user 가 like 눌렀는지 여부 알려주는 함수
  const matchLike = React.useCallback(() => {
    const Likes = comment.likes.find((like) => like.userId === auth?.userId);
    return Likes;
  }, [comment, auth]);

  const toggleUpdate = React.useCallback(() => {
    setToggleAnswerBox((c) => !c);
    setUpdate((c) => !c);
  }, []);

  const handleUpdate = React.useCallback(async () => {
    if (updateEditor.current) {
      const body = {
        content: updateEditor.current?.getInstance().getMarkdown(),
      };
      if (confirm('정말 수정하시겠습니까?')) {
        const res = await updateCommentById(authInfo!.token, comment._id as string, body);
        if (res) {
          setToggleAnswerBox((c) => !c);
          setUpdate((c) => !c);
        }
      }
    }
  }, []);
  React.useEffect(() => {
    viewer.current?.getInstance().setMarkdown(comment.content);
  }, [comment]);
  // 댓글 삭제
  const handleDelete = React.useCallback(async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const res = await deleteCommentById(authInfo!.token, comment._id as string);
      if (res.status === 200) {
        queryClient.invalidateQueries();
      } else {
        alert('삭제에 실패하였습니다. 다시 시도해주세요:(');
      }
    }
  }, []);

  // 댓글 좋아요
  const handleLike = React.useCallback(async () => {
    if (!authInfo) {
      alert('로그인해 주세요');
      return;
    }
    await increaseCommentLikes(authInfo!.token, comment._id as string);
    queryClient.invalidateQueries();
  }, []);

  // 댓글 채택
  const handleAdopted = React.useCallback(async () => {
    if (!authInfo) {
      alert('로그인해 주세요');
      return;
    }
    if (confirm('채택은 1회만 가능합니다. 채택하시겠습니까?')) {
      const res = await adoptComment(authInfo!.token, comment._id);
      if (res.result === 'Conflict') {
        alert(res.reason);
        queryClient.invalidateQueries();
        return;
      }
      queryClient.invalidateQueries();
    }
  }, []);

  return (
    <styles.AnswerBox>
      <styles.InfoHead>
        <styles.InfoHeadBox>
          <styles.ProfileBox>
            {comment.commentType === 'question' && (
              comment.isAdopted
                ? <BsFillBookmarkCheckFill size={30} />
                : auth?.userId !== comment.authorId && article.authorId === auth?.userId && (
                <styles.AdoptedBox>
                  <BsBookmarkCheck size={30} onClick={handleAdopted} />
                </styles.AdoptedBox>
                ))}
            <styles.Profile>
              <Link to={`/profile?id=${comment.authorId}`}>{comment.author}</Link>
            </styles.Profile>
          </styles.ProfileBox>
          <styles.CreateDate>{comment.createdAt.slice(0, 10)}</styles.CreateDate>
        </styles.InfoHeadBox>
      </styles.InfoHead>
      <styles.Main>
        {
          update
            ? <MarkdownEditor initialValue={comment?.content} ref={updateEditor} />
            : <MarkdownViewer text={comment.content} ref={viewer} />
        }
      </styles.Main>
      {toggleAnswerBox
        ? (
          update && (
            <styles.SubInfo>
              <styles.ButtonBox>
                <Button onClick={handleUpdate}>수정하기</Button>
                <Button onClick={toggleUpdate}>취소</Button>
              </styles.ButtonBox>
            </styles.SubInfo>
          )
        )
        : (
          <styles.SubInfo>
            <styles.LikeBox onClick={handleLike} clicked={!!matchLike()}>
              {auth && matchLike()
                ? <AiFillHeart size={20} />
                : <AiOutlineHeart size={20} /> }
              <styles.LikeCount>{comment.likes.length}</styles.LikeCount>
            </styles.LikeBox>
            {auth && !comment.isAdopted && comment.authorId === auth.userId && (
              <styles.ButtonBox>
                <Button onClick={toggleUpdate}>수정하기</Button>
                <Button onClick={handleDelete}>삭제하기</Button>
              </styles.ButtonBox>
            )}
          </styles.SubInfo>
        )}
    </styles.AnswerBox>
  );
}
