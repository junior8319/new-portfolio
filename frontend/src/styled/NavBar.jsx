import styled from 'styled-components';

const NavBar = styled.nav`
  border-bottom: 0.5px solid #e6e6e6;
  display: flex;
  margin: 0;
  align-items: center;
  justify-content: space-evenly;
  height: 50px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  a {
    text-decoration: none;
    padding: 5px;
    margin: 5px;
  };
  a:hover {
    text-decoration: none;
    color: #fff;
    transition: 1s;
  };

  @media (max-width: 500px) {
    display: none;
  }
`;

export default NavBar;
