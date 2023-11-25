import { useContext } from "react";
import { FormContainer, FormDiv100 } from "../../styled/Form";
import { Input } from "../../styled/Inputs";
import { Label } from "../../styled/Labels";
import { Title2 } from "../../styled/Titles";
import { SaveButton } from "../../styled/Buttons";
import { LoginContainer } from '../../styled/Container';
import { requestLogin } from "../../helpers/loginApi";
import { LoginContext } from "../../context/Contexts";
import { SimpleP } from "../../styled/Paragraphs";

const LoginForm = () => {
  const {
    setIsLogged,
    user,
    setUser,
    loginError,
    setLoginError,
  } = useContext(LoginContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const sendLoginRequest = async (event) => {
    event.preventDefault();
    const response = await requestLogin(user);

    if (response && response.message) {
      setLoginError(response.message);
      return;
    }

    if (!response.userData || !response.token) {
      setLoginError('Invalid fields');
      setUser({
        ...user,
        userName: '',
        password: '',
      });
      return;
    }

    if (response) {
      setIsLogged(true);
      localStorage.setItem('user', JSON.stringify(response.userData));
      localStorage.setItem('token', JSON.stringify(response.token));
      setUser(response.userData);
      setLoginError('');
      return response;
    }
  };

  const visitorLogin = async () => {
    const user = {
      userName: 'user',
      password: 'userSuper',
    };

    const promise = new Promise((resolve) => {
      resolve(requestLogin(user));
    });

    const response = promise.then((response) => {
      if (response && response.message) {
        setLoginError(response.message);
        return;
      }

      if (!response.userData || !response.token) {
        setLoginError('Invalid fields');
        setUser({
          ...user,
          userName: '',
          password: '',
        });
        return;
      }

      localStorage.setItem('user', JSON.stringify(response.userData));
      localStorage.setItem('token', JSON.stringify(response.token));

      setLoginError('');
      setIsLogged(true);
      setUser(response.userData);
      return response;
    });

    return response;
  };

  return (
    <LoginContainer>
      <Title2>Login</Title2>

      <FormContainer>
        <FormDiv100>
          <Label
            htmlFor="userName"
          >
            Nome de usuário:
          </Label>

          <Input
            id="userName"
            name="userName"
            type="text"
            value={ user.userName }
            onChange={ handleChange }
          />
        </FormDiv100>

        <FormDiv100>
          <Label
            htmlFor="password"
          >
            Senha:
          </Label>

          <Input
            id="password"
            name="password"
            type="password"
            value={ user.password }
            onChange={ handleChange }
          />
        </FormDiv100>

        { (loginError && loginError === 'Invalid fields') &&
          <SimpleP $color={'#f59a9a'}>
            Dados incorretos, favor verificar seu nome de usuário(a) e/ou
            digitar novamente a sua senha.
          </SimpleP>
        }

        <FormDiv100>
          <SaveButton
            type="button"
            value='Entrar'
            onClick={ sendLoginRequest }
          />

          <SaveButton
            type="button"
            value='Entrar como Visitante'
            onClick={ visitorLogin }
          />
        </FormDiv100>

      </FormContainer>
    </LoginContainer>
  );
};

export default LoginForm;
