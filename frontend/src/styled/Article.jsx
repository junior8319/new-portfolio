import styled from 'styled-components';

const Article = styled.article`
  width: ${ props => props.$width || '70%' };
  margin: ${ props => props.$margin || '10px' };
  max-height: ${ props => props.$maxHeight || '300px' };
  padding: 10px;
  background-color: ${ props => props.$backgroundColor || '#ffffff15' };
  border-radius: 10px;
  flex-grow: 1;
  display: ${props => props.$display || ''};
  align-items: center;
  justify-content: ${props => props.$justifyContent || 'center'};
  text-align: ${props => props.$textAlign || ''};

  @media (max-width: 400px) {
    width: 95%;
    align-self: center;
    margin: ${ props => props.$margin || 'auto' };
    max-height: ${ props => props.$maxHeight || '90%' };
    justify-self: center;
    padding: ${ props => props.$padding || '2px' };
  }
`;

export default Article;
