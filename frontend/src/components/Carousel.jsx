import { useCallback, useEffect, useState } from 'react';
import { Title2, Title3 } from '../styled/Titles';
import { CardPicture } from '../styled/Pictures';
import { SimpleP } from '../styled/Paragraphs';
import ControlBar from '../styled/ControlBar';
import Content from '../styled/Content';
import StacksContainer from '../styled/StacksContainer';
import { ControlButton } from '../styled/Buttons';
import { InnerContent } from '../styled/Container';
import Link from '../styled/Link';

const Carousel = ({ cards, intervalTime }) => {
  const FIRST_CARD_INDEX = 0;
  const LAST_CARD_INDEX = cards.length - 1;
  const [currentCard, setCurrentCard] = useState(FIRST_CARD_INDEX);

  const goToNextCard = useCallback(() => {
    if (currentCard === LAST_CARD_INDEX) {
      setCurrentCard(0);
      return
    }

    setCurrentCard((currentCard + 1));
  }, [LAST_CARD_INDEX, currentCard]);

  const goToPreviousCard = () => {
    if (currentCard === FIRST_CARD_INDEX) {
      setCurrentCard(LAST_CARD_INDEX);
      return;
    };

    setCurrentCard((currentCard - 1));
  };

  const goToLastCard = () => {
    setCurrentCard(LAST_CARD_INDEX);
  };

  const goToFirstCard = () => {
    setCurrentCard(FIRST_CARD_INDEX);
  };

  useEffect(() => {
    const carouselInterval = setInterval(goToNextCard, intervalTime);

    return () => {
      clearInterval(carouselInterval);
    };
  }, [currentCard, goToNextCard, intervalTime]);

  return (
    <StacksContainer>
      {
        (cards && cards.length > 0) &&
          <Content key={cards[currentCard].id}>
            <InnerContent>
              <Title2>{ cards[currentCard].title }</Title2>
              <CardPicture src={ cards[currentCard].imageUrl } alt={ cards[currentCard].title } />
            </InnerContent>
            
            <InnerContent
              $padding={ '15px 5px 30px 5px' }
            >
              <SimpleP $padding={ '0 0 0 10px' } $width={ '95%' }>{ cards[currentCard].description }</SimpleP>
            </InnerContent>
            
            <InnerContent
              $padding={ '0 5px 15px 5px' }
            >
              <Title3>Documentação:</Title3>

              <Link href={ cards[currentCard].stackDocsUrl } target="_blank" rel="noopener noreferrer">
                <SimpleP $padding={ '0 0 0 10px' }>{ cards[currentCard].stackDocsUrl }</SimpleP>
              </Link>
            </InnerContent>

            <InnerContent
              $padding={ '0 5px 30px 5px' }
            >
              <Title3>Página da Ferramenta:</Title3>
              <Link href={ cards[currentCard].stackUrl } target="_blank" rel="noopener noreferrer">
                <SimpleP $padding={ '0 0 0 10px' }>{ cards[currentCard].stackUrl }</SimpleP>
              </Link>
            </InnerContent>
          </Content>
      }

      <ControlBar>
        <ControlButton
          type="button"
          onClick={() => goToFirstCard()}
        >
          { '|<' }
        </ControlButton>

        <ControlButton
          type="button"
          onClick={() => goToPreviousCard()}
        >
          { '<' }
        </ControlButton>

        <ControlButton
          type="button"
          onClick={() => goToNextCard()}
        >
          { '>' }
        </ControlButton>

        <ControlButton
          type="button"
          onClick={() => goToLastCard()}
        >
          { '>|' }
        </ControlButton>
      </ControlBar>
    </StacksContainer>
  );
}

export default Carousel;
