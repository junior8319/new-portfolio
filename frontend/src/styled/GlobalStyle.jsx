import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    background-color: #47425f;
    margin: 3px;
    font-family: 'Verdana', sans-serif;
    color: #b9d6f4;
    line-height: 1.5;
  };
  *:hover {
    color: #488AFA;
    transition: 1s;
  }

  *::-webkit-scrollbar {
    width: 10px;
  }
  
  *::-webkit-scrollbar-track {
    background-color: #ffffff15;
    border: 0.5px solid #b9d6f420;
    border-radius: 15px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #0000ff20;
    border-radius: 15px;
  }
`;

export default GlobalStyle;
