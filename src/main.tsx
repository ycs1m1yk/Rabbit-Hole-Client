import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from '@/App';
import { RecoilRoot } from 'recoil';
import GlobalStyle from '@styles/global-style';
import theme from '@styles/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <React.StrictMode>
        <GlobalStyle />
        <App />
      </React.StrictMode>
    </RecoilRoot>
  </ThemeProvider>
  ,
);
