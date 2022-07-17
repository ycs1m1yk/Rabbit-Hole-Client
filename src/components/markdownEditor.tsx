// markdownEditor
import React, { forwardRef, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';
import postImage from '@lib/imageApi';
import { useMutation } from 'react-query';

interface EditorProps{
  height?:string
}

const defaultProps = {
  height: '300px',
};

/**
 * ref const ref = useRef<Editor>(null) 방식으로 선언한 ref필요 (null로 initializing 필요)
 * Ref.current?.getInstance().getMarkdown(); 방식으로 string value 얻음
 */

const MarkdownEditor = forwardRef<Editor, EditorProps>((props, ref) => {
  // 이상한 default value bug 제거
  useEffect(() => {
    const bug = document.querySelector('.ProseMirror');
    if (bug) bug.innerHTML = '';
  }, []);

  const imageURL = useMutation((imageForm:FormData) => postImage(imageForm), {

  });

  return (
    <Editor
      ref={ref}
      language="ko-KR"
      height={props.height}
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      hooks={{
        async addImageBlobHook(blob, callback) {
          const formData = new FormData();
          let message;
          let name = '업로드 실패';
          if (blob instanceof File) {
            try {
              if (blob.size > 5242880) {
                throw new Error('5MB 이하의 사진을 업로드해주세요.');
              }
              if (blob.type !== 'image/jpeg' && blob.type !== 'image/jpg' && blob.type !== 'image/gif' && blob.type !== 'image/png') {
                throw new Error('지원하지 않는 이미지 타입입니다.');
              }
              formData.set('image', blob);
              const response = await postImage(formData);
              message = response.imageUrl;
              name = blob.name;
            } catch (error:any) {
              message = error.message;
            }
          }
          callback(message, name);
        },
      }}
    />
  );
});

MarkdownEditor.defaultProps = defaultProps;
export default MarkdownEditor;
