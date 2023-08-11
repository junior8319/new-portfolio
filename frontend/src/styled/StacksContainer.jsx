import styled from 'styled-components';

const StacksContainer = styled.section`
  width: 98%;
  height: 750px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto 10px auto;

  article:hover {
    background-color: #0000ff20;
    transition: 1s;
  }

  @media (max-width: 1100px) {
    height: 600px;
  }
`;

export default StacksContainer;