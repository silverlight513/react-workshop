import { injectGlobal } from '../node_modules/styled-components';
import { reset } from '../node_modules/styled-reset';

export default () => injectGlobal`
  ${reset};

  html, body {
    background-color: #E0F0F1;
    font-size: 16px;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    font-family: sans-serif;
  }
`;
