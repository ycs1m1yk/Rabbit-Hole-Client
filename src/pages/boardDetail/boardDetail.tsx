// eslint-disable-next-line no-underscore-dangle
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import * as styles from '@pages/boardDetail/styled';
import { useQuery } from 'react-query';
import authAtom from '@/recoil/auth/authAtom';
// import { getArticleById } from '@/lib/api';
import MarkdownEditor from '@/components/markdownEditor';
import Button from '@/components/button';
import Article from '@/pages/boardDetail/components/Article';
import Answer from '@/pages/boardDetail/components/Answer';
import { getArticleById } from '@/lib/articleApi';

export default function BoardDetail() {
  const auth = useRecoilValue(authAtom);
  const editor = React.useRef(null);
  const [query] = useSearchParams();
  const articleId = query.get('id');
  let article;
  let comments;
  if (articleId) {
    const { data } = useQuery<any>(['projectDetail', articleId], () => getArticleById(articleId));
    if (data) {
      article = data.articleInfo;
      comments = data.commentList;
    }
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  // const handleAnswer = React.useCallback(() => {
  //   const content = editor.current.getInstance().getMarkdown();
  //   const token = useToken();
  //   const data = {
  //     commentType: article.articleType,
  //     content,
  //   };
    // 댓글 POST API
    // postComment(token, data, article._id);
  // }, []);
  return (
    <styles.Container>
      {article && <Article article={article} />}
      <styles.AnswerSection>
        {comments && comments.map((comment) => (
          // eslint-disable-next-line no-underscore-dangle
          <Answer key={comment._id} comment={comment} />
        ))}
        {auth && (
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
            {/* <Button onClick={() => { handleAnswer(); }}>답변하기</Button> */}
          </styles.SubInfo>
        </styles.AnswerBox>
        )}
      </styles.AnswerSection>
    </styles.Container>
  );

}
