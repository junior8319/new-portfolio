import { useEffect, useState } from 'react';
import { LoginContext } from './Contexts';
import { requestGetUsers } from '../helpers/loginApi';

const LoginProvider = ({ children }) => {
  const blankForm = {
    userName: '',
    password: '',
  };

  const [user, setUser] = useState(blankForm);
  const [registeringUser, setRegisteringUser] = useState(blankForm);
  const [users, setUsers] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdministrator, setIsAdministrator] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));

    if (user && token) {
      setUser(user);
      setIsLogged(true);
      (user.role === 'owner')
      ?
        setIsAdministrator(true)
      :
        setIsAdministrator(false);
    }

    requestGetUsers()
    .then((response) => {
      setUsers(response);
    })
    .catch((error) => console.log(error));
  }, []);

  let mappedUsers = users.map((user) => user);

  const contextValue = {
    isLogged,
    setIsLogged,
    user,
    setUser,
    users,
    setUsers,
    mappedUsers,
    isUpdating,
    setIsUpdating,
    registeringUser,
    setRegisteringUser,
    blankForm,
    isAdministrator,
  }
  
  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};


export default LoginProvider;
