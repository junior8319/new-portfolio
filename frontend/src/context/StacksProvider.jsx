import { useEffect, useState } from 'react';
import { getStacks } from '../helpers/stacksApi';
import { StacksContext } from './Contexts';

const StacksProvider = ({ children }) => {
  const [stacks, setStacks] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [stack, setStack] = useState({
    title: '',
    description: '',
    stackDocsUrl: '',
    imageUrl: '',
    stackUrl: '',
  });

  const getStacksFromApi = async () => {
    const data = await getStacks();
    setStacks(data);
    return data;
  };
  
  useEffect(() => {
    getStacksFromApi();
  }, []);

  let mappedStacks = stacks.map((stack) => stack);


  const contextValue = {
    stacks,
    stack,
    mappedStacks,
    isUpdating,
    setStacks,
    setStack,
    setIsUpdating,
    getStacksFromApi,
  }

  return (
    <StacksContext.Provider value={contextValue}>
      {children}
    </StacksContext.Provider>
  )
};

export default StacksProvider;