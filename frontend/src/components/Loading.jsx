import React, { useEffect, useState } from 'react';
import { BiggerLetter, StyledLoading } from '../styled/Loading';

const Loading = (props) => {
  const { word, marginTop, height, width, border, marginBottom, fontSize } = props;

  const WORD = (word && word.length > 0) ? word : 'Carregando...';
  const [loadingText, setLoadingText] = useState('');
  const [nextLetter, setNextLetter] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const arrayText = WORD.split('');
    
    const interval = setInterval(() => {
      setLoadingText((prevText) => {
        const newText = (index === 0) ? arrayText[index] : prevText + arrayText[index];
        return newText;
      });
      setNextLetter(arrayText[index + 1]);
      
      setIndex((prevIndex) => prevIndex + 1);

      if (index > arrayText.length - 1) {
        setIndex(0);
        setLoadingText(arrayText[index]);
        setNextLetter(arrayText[index + 1]);
      };
    }, 200);

    return () => clearInterval(interval);
  }, [WORD, index]);


  return (
    <StyledLoading
      marginTop={ marginTop }
      height={ height }
      width={ width }
      border={ border }
      marginBottom={ marginBottom }
      fontSize={ fontSize }
    >
      { loadingText }
      <BiggerLetter>
        { (nextLetter && nextLetter.length > 0) ? nextLetter : ' ' }
      </BiggerLetter>
    </StyledLoading>
  );
};

export default Loading;
