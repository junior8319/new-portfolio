import styled from 'styled-components';

const NavLink = styled.a`
  color: ${props => props.$color || "#949abe"};
  text-decoration: none;
  background: none;
  margin: 0;
  padding: 0;

  &:hover {
    color: #b9d6f4;
  }
`;

export default NavLink;