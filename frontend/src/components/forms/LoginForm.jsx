import { useContext } from "react";
import { FormContainer, FormDiv100 } from "../../styled/Form";
import { Input } from "../../styled/Inputs";
import { Label } from "../../styled/Labels";
import { Title2 } from "../../styled/Titles";
import { SaveButton } from "../../styled/Buttons";
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
      console.log(response);
      setIsLogged(true);
      return response;
    }
  };

  const visitorLogin = async (event) => {
    event.preventDefault();

    const user = {
      userName: 'visitor',
      password: 'visitorSuper',
    };
    
    const response = await requestLogin(user);

    if (response) {
      if (response.userData) {
        setIsLogged(true);
        localStorage.setItem('user', JSON.stringify(response.userData));
        localStorage.setItem('token', JSON.stringify(response.token));
      }
      return response;
    }
  };

  return (
    <>
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
    </>
  );
};

export default LoginForm;
