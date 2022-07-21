import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};
  @import url(//font.elice.io/EliceDigitalBaeum.css);
  html {
    font-family: "Elice Digital Baeum",sans-serif;
    font-size: 62.5%;
  }
  html, body, #root{
    width: 100%;
  }
  #root {
    min-height: 100vh;
    position: relative;
    padding-bottom: 75px;
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
    padding-bottom: 2rem;
    font-size: 3.5rem;
    font-weight: Bolder;
    border-bottom: 1px solid ${(props) => props.theme.palette.borderGray} ;
  };
  h2{
    font-size: 2.5rem;
    font-weight: bold;
  };
  h3{
     font-size: 1.7rem;
     font-weight: bold;
  };
`;

export default GlobalStyle;
