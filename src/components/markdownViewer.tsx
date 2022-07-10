import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

interface ViewerProps{
  text: string,
}

// markdownViewer
export default function MarkdownViewer({ text = 'dfsf' }:ViewerProps) {
  return (
    <Viewer initialValue={text} />
  );
}
