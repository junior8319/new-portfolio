import styled from 'styled-components';

export const NormalPicture = styled.img`
  width: 200px;
  height: 250px;
  background: none;
  border-radius: 10px;
  position: relative;
  top: 0;
  right: 0;
  box-shadow: 0 0 10px rgba(0, 0, 100, 0.5);

  @media (max-width: 1100px) {
    max-width: 125px;
    max-height: 150px;
  }

  @media (max-width: 700px) {
    justify-self: center;
    text-align: center;
    align-self: center;
    margin: auto;
    width: 100%;
    height: auto;
  }
`;

export const CardPicture = styled.img`
  width: ${props => props.$width || '100px'};
  background: none;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 100, 0.5);

  @media (max-width: 1100px) {
    max-width: 75px;
  }

  @media (max-width: 700px) {
    text-align: center;
    align-self: center;
    margin: 7.5px auto;
  }
`;

export const ProjectPicture = styled.img`
  border-radius: 5px;
  max-height: ${props => props.$maxHeight || '300px'};
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  justify-self: center;
`;
