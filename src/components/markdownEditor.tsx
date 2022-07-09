// markdownEditor
import React, { forwardRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';

const MarkdownEditor = forwardRef<Editor>((props, ref) => (
  <Editor
    ref={ref}
    plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
    hooks={{
      addImageBlobHook(blob, callback) {
        console.log(blob);
        callback(import.meta.env.VITE_IMAGE_SERVER_URL, '티모');
      },
    }}
  />
));

export default MarkdownEditor;
