import { createGlobalStyle } from 'styled-components';
import 'font-awesome/css/font-awesome.css';

const GlobalStyles = createGlobalStyle`
  *{
    margin: 0px;
    padding:0px;
    box-sizing: border-box;
    outline:0;

  }
  body{
    background: #333A56;
    text-rendering: optimizeLegibility !important;
    font-family: sans-serif;
  }
`;

export default GlobalStyles;
