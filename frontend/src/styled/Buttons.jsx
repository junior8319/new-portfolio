import styled from "styled-components";

export const ControlButton = styled.button`
  background-color: #0000ff20;
  border: none;
  font-weight: bold;
  padding: 10px;
  border-radius: 10px;
  width: 20%;
  color: #b9d6f4;
  text-align: center;

  &:hover {
    background-color: #b9d6f4;
    color: #47425f;
  }

  @media (max-width: 1100px) {
    font-size: 0.7rem;
    padding: 5px;
    width: 70px;
  }

  @media (max-width: 400px) {
    width: 20%;
  }
`;

export const SaveButton = styled.input`
  border: none;
  font-weight: bold;
  font-size: 0.9rem;
  padding: 10px;
  border-radius: 10px;
  width: 180px;
  background-color: #13890f;
  color: #e1dbdb;
  text-align: center;
  
  &:hover {
    background-color: #e1dbdb;
    color: #13890f;
  }

  @media (max-width: 1100px) {
    font-size: 0.8rem;
    width: 120px;
  }

  @media (max-width: 400px) {
    font-size: 0.7rem;
    width: 90px;
  }
`;

export const CancelButton = styled.input`
  border: none;
  text-align: center;
  font-weight: bold;
  font-size: 0.8rem;
  padding: 10px;
  border-radius: 10px;
  width: 150px;
  background-color: #89250f;
  color: #e1dbdb90;
  
  &:hover {
    background-color: #89250f;
    color: #e1dbdb;
  }

  @media (max-width: 1100px) {
    font-size: 0.7rem;
    width: 100px;
  }

  @media (max-width: 400px) {
    font-size: 0.6rem;
    width: 80px;
  }
`;

export const NavMenuButton = styled.button`
  border: 0.5px solid #e1dbdb50;
  border-radius: 50px;
  padding: 10px;
  margin: 5px;
  position: ${props => props.$position || ''};
  z-index: ${props => props.$zIndex || ''};
  background-color: #47425f90;
  text-align: center;

  @media (min-width: 501px) {
    display: none;
  }
`;
