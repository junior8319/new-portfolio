import styled from 'styled-components';

export const Title1 = styled.h1`
  font-size: 1.3rem;
  background: none;
  padding: 5px 0;

  @media (max-width: 1100px) {
    font-size: 1.1rem;
  }

  @media (max-width: 400px) {
    font-size: 1rem;
    width: 100%;
  }
`;

export const Title2 = styled.h2`
  font-size: 1.1rem;
  background: none;
  padding: 5px 0;

  @media (max-width: 1100px) {
    font-size: 0.9rem;
  }

  @media (max-width: 400px) {
    font-size: 0.80rem;
    width: 100%;
  }
`;

export const Title3 = styled.h3`
  font-size: 1.0rem;
  background: none;
  padding: 5px 0;

  @media (max-width: 1100px) {
    font-size: 0.80rem;
  }

  @media (max-width: 400px) {
    font-size: 0.75rem;
    width: 100%;
  }
`;
