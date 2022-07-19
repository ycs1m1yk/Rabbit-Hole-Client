/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-underscore-dangle
// eslint-disable-next-line no-alert
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import * as styles from '@pages/boardDetail/styled';
import { useQuery, useQueryClient } from 'react-query';
import { Editor } from '@toast-ui/react-editor';
import authAtom from '@/recoil/auth/authAtom';
// import { getArticleById } from '@/lib/api';
import MarkdownEditor from '@/components/markdownEditor';
import Button from '@/components/button';
import Article from '@/pages/boardDetail/components/Article';
import Answer from '@/pages/boardDetail/components/Answer';
import { getArticleById } from '@/lib/articleApi';
import useToken from '@/hooks/useToken';
import { postComment } from '@/lib/commentApi';
import { ICommentProps } from '@/interfaces/interface';

export default function BoardDetail() {
  const queryClient = useQueryClient();
  const auth = useRecoilValue(authAtom);
  const editor = React.useRef<Editor>(null);
  const [query] = useSearchParams();
  const articleId = query.get('id');
  const [toggleAnswerBox, setToggleAnswerBox] = React.useState<boolean>(false);
  if (!articleId) {
    return (<styles.EmptyField>일치하는 게시글이 없습니다.</styles.EmptyField>);
  }
  const { authInfo } = useToken();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { data, isError } = useQuery<any>(['boardDetail', articleId], () => getArticleById(articleId), {
    enabled: !!articleId,
    select: (fetchData) => ({ article: fetchData.articleInfo, comments: fetchData.commentList }),
    refetchInterval: 30000,
  });
  const handleAnswer = React.useCallback(async (articleType: string) => {
    try {
      const content = editor.current?.getInstance().getMarkdown();
      const postParams = { commentType: articleType, content };
      await postComment(authInfo!.token, articleId as string, postParams);
      editor.current?.getInstance().insertText('');
      queryClient.invalidateQueries();
    } catch (e: any) {
      alert('문제가 발생했습니다. 다시  시도해주세요:(');
    }
  }, []);
  if (isError || (data && typeof data.article === 'undefined')) {
    return (<styles.EmptyField>일치하는 게시글이 없습니다.</styles.EmptyField>);
  }
  return (
    <styles.Container>
      {data && (
        <Article
          article={data.article}
          comments={data.comments}
        />
      )}
      { data && (data.comments.length > 0 || auth) && (
        <styles.AnswerSection>
          {data && data.comments.map((comment:ICommentProps) => (
            <Answer
              key={comment._id}
              comment={comment}
              setToggleAnswerBox={setToggleAnswerBox}
              toggleAnswerBox={toggleAnswerBox}
            />
          ))}
            {!toggleAnswerBox && auth && (
              <styles.AnswerBox>
                <styles.InfoHead>
                  <styles.InfoHeadBox>
                    <styles.ProfileBox>
                      <styles.Profile>{ `${auth?.userName}님 답변해 주세요` }</styles.Profile>
                    </styles.ProfileBox>
                  </styles.InfoHeadBox>
                </styles.InfoHead>
                <styles.Main>
                  <MarkdownEditor ref={editor} />
                </styles.Main>
                <styles.SubInfo>
                  <Button onClick={() => handleAnswer(data.article.articleType)}>답변하기</Button>
                </styles.SubInfo>
              </styles.AnswerBox>
            )}
        </styles.AnswerSection>
      )}
    </styles.Container>
  );
}
