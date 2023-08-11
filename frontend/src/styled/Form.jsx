import styled from 'styled-components';

export const FormDiv100 = styled.div`
  border: none;
  padding: ${ props => props.$padding || '5px' };
  margin: ${ props => props.$margin };
  border-radius: 10px;
  width: 95%;
  background-color: transparent;
  color: #e1dbdb90;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const FormDiv50 = styled.div`
  border: none;
  padding: 5px;
  border-radius: 10px;
  width: 45%;
  background-color: transparent;
  color: #e1dbdb90;
`;

export const FormDiv30 = styled.div`
  border: none;
  padding: 5px;
  border-radius: 10px;
  width: 28%;
  background-color: transparent;
  color: #e1dbdb90;

  @media (max-width: 1100px) {
    flex-wrap: wrap;
    width: 45%;
  }
`;

export const FormDiv25 = styled.div`
  border: none;
  padding: 5px;
  border-radius: 10px;
  width: 22%;
  background-color: transparent;
  color: #e1dbdb90;

  @media (max-width: 1100px) {
    width: 45%;
  }

  @media (max-width: 650px) {
    width: 100%;
    justify-content: center;
  }
`;

export const FormContainer = styled.form`
  border: none;
  padding: 5px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: end;
  margin: auto;
  width: 97.5%;
  
  * {
    font-size: 1rem;
  }

  @media (max-width: 400px) {
    width: 95%;
    padding: 0;

    * {
      font-size: 0.8rem;
    }
  }
`;