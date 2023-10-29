import styled from 'styled-components';

export const SimpleP = styled.p`
  color: ${props => props.$color || ""};
  font-size: ${props => props.$size || "0.90rem"};
  background: none;
  width: ${props => props.$width || "85%"};
  padding: ${props => props.$padding || "10px 0"};
  text-align: ${props => props.$textAlign || ""};

  @media (max-width: 1100px) {
    font-size: ${props => props.$size || "0.75rem"};
  }

  @media (max-width: 400px) {
    font-size: ${props => props.$size || "0.65rem"};
    margin: auto;
    width: 95%;    
  }
`;