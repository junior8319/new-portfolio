import { FormContainer, FormDiv25 } from "../../styled/Form";
import { Input } from "../../styled/Inputs";
import { Label } from "../../styled/Labels";
import { Title2 } from "../../styled/Titles";

const LoginForm = () => {
  return (
    <>
      <Title2>Login</Title2>

      <FormContainer>
        <FormDiv25>
          <Label
            htmlFor="userName"
          >
            Nome de usuário:
          </Label>

          <Input
            id="userName"
            name="userName"
            type="text"
            value={''}
            onChange={''}
          />
        </FormDiv25>

        <FormDiv25>
          <Label
            htmlFor="password"
          >
            Senha:
          </Label>

          <Input
            id="password"
            name="password"
            type="password"
            value={''}
            onChange={''}
          />
        </FormDiv25>
      </FormContainer>
    </>
  );
};

export default LoginForm;
