import styled from 'styled-components';

export const SimpleP = styled.p`
  color: ${props => props.$color || ""};
  font-size: ${props => props.$size || "1rem"};
  background: none;
  width: ${props => props.$width || "85%"};
  padding: ${props => props.$padding || "10px 0"};

  @media (max-width: 1100px) {
    font-size: ${props => props.$size || "0.85rem"};
  }

  @media (max-width: 400px) {
    font-size: ${props => props.$size || "0.80rem"};
    margin: auto;
    width: 95%;    
  }
`;