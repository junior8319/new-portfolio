import styled from 'styled-components';

export const Title1 = styled.h1`
  font-size: 1.5rem;
  background: none;
  padding: 5px 0;

  @media (max-width: 1100px) {
    font-size: 1.3rem;
  }

  @media (max-width: 400px) {
    font-size: 1.1rem;
    width: 100%;
  }
`;

export const Title2 = styled.h2`
  font-size: 1.2rem;
  background: none;
  padding: 5px 0;

  @media (max-width: 1100px) {
    font-size: 1rem;
  }

  @media (max-width: 400px) {
    font-size: 0.90rem;
    width: 100%;
  }
`;

export const Title3 = styled.h3`
  font-size: 1.0rem;
  background: none;
  padding: 5px 0;

  @media (max-width: 1100px) {
    font-size: 0.90rem;
  }

  @media (max-width: 400px) {
    font-size: 0.85rem;
    width: 100%;
  }
`;
