import React, { forwardRef } from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';

interface ViewerProps{
  text: string,
}

// markdownViewer
const MarkdownViewer = forwardRef<Viewer, ViewerProps>((props, ref) => (
  <Viewer
    ref={ref}
    initialValue={props.text}
    plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
  />
));

export default MarkdownViewer;
