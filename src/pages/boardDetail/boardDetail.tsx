// eslint-disable-next-line no-underscore-dangle
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import * as styles from '@pages/boardDetail/styled';
import authAtom from '@/recoil/auth/authAtom';
// import { getArticleById } from '@/lib/api';
import MarkdownEditor from '@/components/markdownEditor';
import Button from '@/components/button';
import Article from '@/pages/boardDetail/components/Article';
import Answer from '@/pages/boardDetail/components/Answer';
import { IArticleProps, ICommentProps } from '@/interfaces/interface';
import { postComment } from '@/lib/api';
import useToken from '@/hooks/useToken';

const articleData = {
  _id: 'asdfasef',
  articleType: 'qna',
  author: '엘리스발',
  authorId: 'asdf',
  title: '이것은 타이틀 예시입니다.',
  content: '# 안녕하세요 ### 반갑습니다.',
  likes: [{ userId: 'vanoiev' }, { userId: 'asdf' }],
  views: 14,
  carrots: 100,
  tags: [{ name: '테스트' }],
  createdAt: new Date(),
  updatedAt: new Date(),
  __v: 1234,
};

const commentData = [
  {
    _id: 'adfegaave',
    commentType: 'wow',
    author: '엘리시발',
    articleId: 'davnoe',
    authorId: 'asdf',
    content: '## 안녕하세요 ### 답변입니다.',
    likes: [{ userId: 'asdf' }],
    isAdopted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 123,
  },
  {
    _id: 'adfavase',
    commentType: 'wow',
    author: '엘리시발',
    articleId: 'davnoe',
    authorId: 'asdf',
    content: '## 안녕하세요 ### 답변입니다.',
    likes: [{ userId: 'vanoiev' }, { userId: 'asdf' }],
    isAdopted: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 123,
  },
  {
    _id: 'adfaseve',
    commentType: 'wow',
    author: '엘리시발',
    articleId: 'davnoe',
    authorId: 'aveiave',
    content: '## 안녕하세요 ### 답변입니다.',
    likes: [{ userId: 'vanoiev' }],
    isAdopted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 123,
  },
  {
    _id: 'adfvdaave',
    commentType: 'wow',
    author: '엘리시발',
    articleId: 'davnoe',
    authorId: 'aveiave',
    content: '## 안녕하세요 ### 답변입니다.',
    likes: [{ userId: 'vanoiev' }],
    isAdopted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 123,
  },
];

export default function BoardDetail() {
  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);
  const editor = React.useRef(null);
  const [query] = useSearchParams();
  const id = query.get('id');
  const [article, setArticle] = useState<IArticleProps>({
    _id: '',
    articleType: '',
    author: '',
    authorId: '',
    title: '',
    content: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
  });
  const [comments, setComments] = useState<ICommentProps[]>([]);
  useEffect(() => {
    // const articleDataa = getArticleById(id);
    // setAuth({
    //   userName: '',
    //   token: '',
    //   expire: '',
    //   userId: '',
    // });
    setArticle(articleData);
    setComments(commentData);
  }, [id]);
  console.log(article);
  console.log(comments);
  console.log(auth);
  const handleAnswer = React.useCallback(() => {
    const content = editor.current.getInstance().getMarkdown();
    const token = useToken();
    const data = {
      commentType: article.articleType,
      content,
    };
    // 댓글 POST API
    postComment(token,data,article._id);
  }, []);
  return (
    <styles.Container>
      {article._id !== '' && <Article article={article} />}
      <styles.AnswerSection>
        {comments.length > 0 ? comments.map((comment) => (
          // eslint-disable-next-line no-underscore-dangle
          <Answer key={comment._id} comment={comment} />
        )) : null}
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
            <Button onClick={() => { handleAnswer(); }}>답변하기</Button>
          </styles.SubInfo>
        </styles.AnswerBox>
        )}
      </styles.AnswerSection>
    </styles.Container>
  );
}
