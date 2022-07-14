// markdownEditor
import React, { forwardRef, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';
import { postImage } from '@lib/userApi';

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

  return (
    <Editor
      ref={ref}
      language="ko-KR"
      height={props.height}
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      hooks={{
        addImageBlobHook(blob, callback) {
          try {
            console.log(blob);
            if (blob instanceof File) {
              if (blob.size > 5242880) {
                callback('5mb 이하의 파일만 업로드해주세요.');
              }
              const fileReader = new FileReader();
              fileReader.onloadend = () => {
                if (fileReader.result) {
                  console.log(fileReader.result);
                  const data = new FormData();
                  data.append('body', blob);
                  data.append('type', blob.type);
                  data.append('filename', blob.name);
                  postImage(data);
                }
              };
              fileReader.readAsArrayBuffer(blob);
            }
          } catch (error) {
            callback(`${error} 파일 업로드 중 오류가 발생했습니다.`);
          }
          return false;
        },
      }}
    />
  );
});

MarkdownEditor.defaultProps = defaultProps;
export default MarkdownEditor;
