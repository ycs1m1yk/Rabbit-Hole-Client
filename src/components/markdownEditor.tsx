// markdownEditor
import React, { forwardRef, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';

interface EditorProps{
  height?:string
}

const defaultProps = {
  height: '300px',
};

/**
 * ref const ref = useRef(null) 방식으로 선언한 ref필요 (null로 initializing 필요)
 * Ref.current.getInstance().getMarkdown(); 방식으로 string value 얻음
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
          console.log(blob);
          callback(import.meta.env.VITE_IMAGE_SERVER_URL, '티모');
        },
      }}
    />
  );
});

MarkdownEditor.defaultProps = defaultProps;
export default MarkdownEditor;
