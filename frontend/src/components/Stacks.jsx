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

  return (
    (stacks && stacks.length)
    ?
      <Article
        $maxHeight="fit-content"
      >
        <Title1>Ferramentas que conheço:</Title1>
        <Carousel cards={ stacks } intervalTime={ 30000 } />
      </Article>
    :
      <Article>
        <Loading />
      </Article>
  );
};

export default Stacks;
