import { useState } from 'react';
import { LoginContext } from './Contexts';

const LoginProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  const contextValue = {
    isLogged,
    setIsLogged,
  }
  
  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};


export default LoginProvider;
