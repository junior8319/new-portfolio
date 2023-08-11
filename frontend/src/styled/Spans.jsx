import styled from 'styled-components';

const colors = [
  '#544fd1',
  '#6a6899',
  '#363385',
  '#908ed1',
  '#211f52',
  '#3d72f6',
  '#1d3675',
];

const getRandomColor = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const Tag = styled.span`
  color: ${props => props.$color || ''};
  font-size: ${props => props.$size || '0.95rem'};
  background: ${() => getRandomColor(colors)};
  padding: 10px;
  border-radius: 10px;

  @media (max-width: 500px) {
    font-size: 0.75rem;
  }
`;