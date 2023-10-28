import { useContext } from "react";
import { FormContainer, FormDiv100 } from "../../styled/Form";
import { Input } from "../../styled/Inputs";
import { Label } from "../../styled/Labels";
import { Title2 } from "../../styled/Titles";
import { SaveButton } from "../../styled/Buttons";
import { LoginContainer } from '../../styled/Container';
import { requestLogin } from "../../helpers/loginApi";
import { LoginContext } from "../../context/Contexts";

const LoginForm = () => {
  const { setIsLogged, user, setUser } = useContext(LoginContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const sendLoginRequest = async (event) => {
    event.preventDefault();
    const response = await requestLogin(user);

    if (response) {
      setIsLogged(true);
      localStorage.setItem('user', JSON.stringify(response.userData));
      localStorage.setItem('token', JSON.stringify(response.token));
      return response;
    }
  };

  const visitorLogin = async () => {
    const user = {
      userName: 'user',
      password: 'userSuper',
    };
    
    const promise = new Promise((resolve, reject) => {
      resolve(requestLogin(user));
    });
    const response = promise.then((response) => {
      localStorage.setItem('user', JSON.stringify(response.userData));
      localStorage.setItem('token', JSON.stringify(response.token));
      setIsLogged(true);
      setUser(response.userData);
      return response;
    });

    if (response) {
      return response;
    }
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
