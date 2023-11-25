import { useEffect, useState } from 'react';
import { LoginContext } from './Contexts';
import { requestGetUsers } from '../helpers/loginApi';

const LoginProvider = ({ children }) => {
  const blankForm = {
    id: null,
    userName: '',
    password: '',
    role: '',
  };

  const [user, setUser] = useState(blankForm);
  const [registeringUser, setRegisteringUser] = useState(blankForm);
  const [users, setUsers] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdministrator, setIsAdministrator] = useState(false);
  const [token, setToken] = useState('');
  const [loginError, setLoginError] = useState('');

  const getUsersFromApi = async () => {
    const data = await requestGetUsers();
    setUsers(data);
    return data;
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));

    if (user && token) {
      setUser(user);
      setToken(token);
      setIsLogged(true);
    }

    requestGetUsers()
    .then((response) => {
      setUsers(response);
    })
    .catch((error) => console.log(error));
  }, []);

  let mappedUsers = users.map((user) => user);

  const contextValue = {
    blankForm,
    isLogged,
    setIsLogged,
    user,
    users,
    registeringUser,
    setUser,
    setUsers,
    mappedUsers,
    isUpdating,
    setIsUpdating,
    setRegisteringUser,
    isAdministrator,
    setIsAdministrator,
    token,
    setToken,
    loginError,
    setLoginError,
    getUsersFromApi,
  }

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};


export default LoginProvider;
