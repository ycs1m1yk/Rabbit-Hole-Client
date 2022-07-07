import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import EliceBold from '@assets/fonts/EliceDigitalBaeumOTF_Bold.woff';
import EliceRegular from '@assets/fonts/EliceDigitalBaeumOTF_Regular.woff';

const GlobalStyle = createGlobalStyle`
  ${reset};
  @font-face {
    font-family: 'EliceBold';
    src: url(${EliceBold}) format('woff');
  }
  @font-face {
    font-family: 'EliceRegular';
    src: url(${EliceRegular}) format('woff');
  }
  html {
    font-size: 62.5%;
  }
  html, body{
    font-family: "EliceRegular", sans-serif;
  };
  a {
    text-decoration: none;
    color: inherit;
  };
  * {
    box-sizing: border-box;
  };
`;

export default GlobalStyle;
