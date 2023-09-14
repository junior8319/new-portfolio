import { useState } from 'react';
import { LoginContext } from './Contexts';

const LoginProvider = ({ children }) => {
  const blankForm = {
    userName: '',
    password: '',
  };

  
  const [user, setUser] = useState(blankForm);
  const [isLogged, setIsLogged] = useState(false);

  const contextValue = {
    isLogged,
    setIsLogged,
    user,
    setUser,
    blankForm,
  }
  
  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};


export default LoginProvider;
