import styled from 'styled-components';

const ControlBar = styled.nav`
  width: 100%;
  height: 7%;
  padding: 0;
  background-color: transparent;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 5px auto;

  @media (max-width: 400px) {
    align-self: center;
    justify-self: center;
  }
`;

export default ControlBar;
