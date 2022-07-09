import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

interface ViewerProps{
  text: string,
}

// markdownViewer
export default function MarkdownViewer({ text = '' }:ViewerProps) {
  return (
    <Viewer initialValue="![티모](https://c.tenor.com/sK02BXIShR0AAAAC/%ED%8B%B0%EB%AA%A8-%EB%A9%94%EB%A1%B1.gif)" />
  );
}
