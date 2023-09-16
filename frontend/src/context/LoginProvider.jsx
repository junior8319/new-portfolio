import { useEffect, useState } from 'react';
import { LoginContext } from './Contexts';

const LoginProvider = ({ children }) => {
  const blankForm = {
    userName: '',
    password: '',
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));

    if (user && token) {
      setUser(user);
      setIsLogged(true);
    }
  }, []);
  
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
