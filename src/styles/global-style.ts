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
    font-family: "EliceRegular", sans-serif;
    font-size: 62.5%;
  }
  html, body, #root{
    width: 100%;
    height: 100%;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  * {
    box-sizing: border-box;
  }
  h1{
    width:100%;
    padding-bottom: 10px;
    font-size: 2rem;
    font-weight: Bolder;
    border-bottom: 1px solid ${(props) => props.theme.palette.borderGray} ;
  };
  h2{
    font-size: 1.5rem;
    font-weight: bold;
  };
  h3{
     font-size: 1.17rem;
     font-weight: bold;
  };
`;

export default GlobalStyle;
