import styled from 'styled-components';

export const Label = styled.label`
  width: 100%;
  background-color: transparent;
  font-size: 1.3rem;
  margin: 0;
  padding: 0;

  @media (max-width: 1100px) {
    font-size: 0.85rem;
  }
`;

export const Span = styled.span`
  font-size: 1.3rem;
  color: #f59a9a;
  background-color: transparent;

  @media (max-width: 1100px) {
    font-size: 1.1rem;
  }
`;
