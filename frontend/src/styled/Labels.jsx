import styled from 'styled-components';

export const Label = styled.label`
  width: ${props => props.$width || '100%'};
  display: ${props => props.$display || ''};
  background-color: transparent;
  font-size: ${props => props.$fontSize || '1.1rem'};
  margin: 0;
  padding: 0;

  @media (max-width: 1100px) {
    font-size: 0.85rem;
  }
`;

export const Span = styled.span`
  padding: ${props => props.$padding || ''};
  border: ${props => props.$border || ''};
  border-radius: ${props => props.$borderRadius || '10px'};
  font-size: ${props => props.$fontSize || '1.1rem'};
  color: ${props => props.$color || '#f59a9a'};
  background-color: ${props => props.$backgroundColor || 'transparent'};
  margin: ${props => props.$margin || ''};

  :hover {
    cursor: ${props => props.$cursor || 'pointer'};
    background-color: ${props => props.$hoverBackgroundColor || '#e1dbdb80'};
    color: ${props => props.$hoverColor || '#89250f80'};
  }

  @media (max-width: 1100px) {
    font-size: 1.1rem;
  }
`;
