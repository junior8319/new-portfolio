import { useEffect, useState } from 'react';
import { getStacks } from '../helpers/stacksApi';
import Article from '../styled/Article';
import { Title1 } from '../styled/Titles';
import Carousel from './Carousel';
import Loading from './Loading';

const Stacks = () => {
  const [stacks, setStacks] = useState([]);
  
  useEffect(() => {
    getStacks()
      .then(data => setStacks(data));
  }, []);

  useEffect(() => {}, [stacks]);

  if (!stacks || stacks.length === 0) {
    return (
      <Article>
        <Loading />
      </Article>
    );
  }

  return (
    <Article
      $maxHeight="fit-content"
    >
      <Title1>Ferramentas que conheço:</Title1>
      <Carousel cards={ stacks } intervalTime={ 30000 } />
    </Article>
  );
};

export default Stacks;
