import styled from 'styled-components';

export const TableContainer = styled.section`
  border: none;
  padding: 5px;
  border-radius: 10px;
  width: 97.5%;
  max-height: 175px;
  margin: auto;
  margin-top: 5px;
  overflow-y: scroll;

  * {
    font-size: 0.80rem;
  }

  @media (max-width: 400px) {
    * {
      font-size: 0.70rem;
    }
  }
`;

export const Table = styled.table`
  width: 92.5%;
  border-collapse: collapse;
  margin: auto;
`;

export const TableHead = styled.thead`
  width: 95%;
  
  * {
    font-size: 1rem;
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;

export const TableBody = styled.tbody`
  @media (max-width: 1100px) {
    font-size: 0.80rem;
  }
`;

export const Row = styled.tr`
  width: 95%;

  @media (max-width: 1100px) {
    display: block;
    margin-bottom: 20px;
  }
`;

export const Col = styled.td`
  margin: auto;
  padding: auto;
  text-align: center;
  border-bottom: 1px solid #e1dbdb70;

  @media (max-width: 1100px) {
    display: block;
    text-align: justify;

    &::before {
      content: attr(data-label);
    }
  }

  @media (max-width: 400px) {
    font-size: 0.75rem;
  }
`;

export const HeadCol = styled.th`
  margin: 0 auto;
  padding: auto;
  text-align: center;
  border-bottom: 1px solid #e1dbdb;
`;

export const ColBtnDiv = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;

  @media (max-width: 1100px) {
    width: 50%;
    margin: auto;
  }
`;

export const ColUpdateBtn = styled.button`
  border: none;
  min-width: 75px;
  width: fit-content;
  padding: 5px;
  background-color: #bc6412;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;

  @media (max-width: 1100px) {
    font-size: 0.80rem;
    width: 100px;
    margin: auto;
  }

  @media (max-width: 400px) {
    font-size: 0.70rem;
    width: 80px;
  }

  &:hover {
    background-color: #e1dbdb;
    color: #bc6412;
  }
`;

export const ColDeleteBtn = styled.button`
  border: none;
  min-width: 75px;
  width: fit-content;
  padding: 5px;
  background-color: #89250f;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;

  @media (max-width: 1100px) {
    font-size: 0.80rem;
    margin: auto;
  }

  @media (max-width: 400px) {
    font-size: 0.70rem;
  }

  &:hover {
    background-color: #e1dbdb;
    color: #89250f;
  }
`;
