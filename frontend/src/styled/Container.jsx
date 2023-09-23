import styled from 'styled-components';

export const InnerContent = styled.div`
  background-color: ${props => props.$backGround || 'transparent'};
  width: ${props => props.$width || '95%'};
  margin: ${props => props.$margin || '5px 0'};
  padding: ${props => props.$padding || '0 10px'};
  justify-content: center;
`;

export const NavBarMenu = styled.div`
  background-color: #e1dbdb;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  z-index: 1;
  animation: fadeIn 1s;
  width: 95%;
  height: 300px;
  margin: 5px auto;
  left: auto;

  @keyframes fadeIn {
    from {
      opacity: 0;
      width: 10%;
      height: 10px;
    }

    to {
      opacity: 1;
      width: 95%;
      height: 300px;
    }
  }

  a {
    margin: 0 30px;
    padding: 10px 0;
    color: #47425f;
    background-color: transparent;
    text-decoration: none;
  }

  @media (min-width: 500px) {
    display: none;
  }
`;

export const LoginContainer = styled.article`
background-color: ${props => props.$backGround};
width: 50%;
border-radius: 10px;
border: 1px solid #037d1a40;
margin: auto;
margin-top: 25vh;
margin-bottom: 25vh;
max-height: ${props => props.$maxHeight || ''};
padding: 40px;
align-self: center;

article:hover {
  background-color: #037d1a40;
  transition: 1s;
}

@media (max-width: 800px) {
  flex-wrap: wrap;
}
`;

const Container = styled.section`
  background-color: ${props => props.$backGround};
  width: 100%;
  position: relative;
  top: 55px;
  border-radius: 10px;
  display: flex;
  flex-wrap: ${props => props.$flexWrap || ''};
  margin: 0 auto;
  max-height: ${props => props.$maxHeight || '95%'};

  article:hover {
    background-color: #0000ff20;
    transition: 1s;
  }

  @media (max-width: 800px) {
    flex-wrap: wrap;
  }
`;

export default Container;
