import { useContext } from "react";
import { FormContainer, FormDiv100 } from "../../styled/Form";
import { Input, Select } from "../../styled/Inputs";
import { Label } from "../../styled/Labels";
import { Title2 } from "../../styled/Titles";
import { LoginContext } from "../../context/Contexts";
import { requestGetUsers } from "../../helpers/loginApi";
import { CancelButton, SaveButton } from "../../styled/Buttons";

const UsersForm = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const API_ORIGIN = process.env.REACT_APP_BASE_URL_ORIGIN;

  const {
    token,
    registeringUser,
    setRegisteringUser,
    isUpdating,
    setIsUpdating,
    setUsers,
    isAdministrator,
    blankForm
  } = useContext(LoginContext);

  const handleChange  = (event) => {
    const { name, value } = event.target;
    setRegisteringUser({ ...registeringUser, [name]: value });
  };

  const stopUpdating = () => {
    setIsUpdating(false);
    setRegisteringUser(blankForm);
  };

  const sendRegisterRequest = async () => {
    console.log('registeringUser', JSON.stringify(registeringUser));
    const registerOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': API_ORIGIN,
        'Accept': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(registeringUser),
    };

    const registerResponse = await fetch(
      `${BASE_URL}/users/create`,
      registerOptions
    );

    console.log('registerResponse', registerResponse);
    // await registerResponse.json();
    // console.log(registerResponse.json());

    stopUpdating();

    requestGetUsers()
    .then((data) => setUsers(data));
  };
  
  return (
    <>
      <Title2>Cadastro de Usuários(as)</Title2>
      <FormContainer action="POST">
        <FormDiv100>
          <Label htmlFor="input-name">
            Nome:
          </Label>

          <Input
            id="input-name"
            name="userName"
            type="text"
            value={registeringUser.userName}
            onChange={handleChange}
          />
        </FormDiv100>

        <FormDiv100>
          <Label htmlFor="input-password">
            Senha:
          </Label>

          <Input
            id="input-password"
            name="password"
            type="password"
            value={registeringUser.password}
            onChange={handleChange}
          />
        </FormDiv100>

        <FormDiv100>
          <Label htmlFor="input-role">
            Função:
          </Label>

          <Select
            name="role"
            id="role"
            value={registeringUser.role}
            onChange={handleChange}
          >
            <option value="owner">Administrador(a)</option>
            <option value="visitor">Visitante</option>
          </Select>
        </FormDiv100>

        { !isUpdating
          ?
          (
            <SaveButton
              type="button"
              value='Salvar'
              onClick={ (event) => {
                event.preventDefault();
                if (!isAdministrator) {
                  return alert(
                    'Você não tem permissão para cadastrar usuários(as).'
                  );
                }
                sendRegisterRequest();
              }}
            />
          )
          :
          (
            <SaveButton
              type="button"
              value="Alterar"
              onClick={ (event) => {
                event.preventDefault();
                console.log('isAdministrator', isAdministrator);
                if (!isAdministrator) {
                  stopUpdating();
                  return alert(
                    'Você não tem permissão para alterar usuários(as).'
                  );
                }
                sendRegisterRequest();
              }}
            />
          )
        }

        {
          isUpdating
          && (
            <CancelButton
              type="button"
              value="Cancelar"
              onClick={ stopUpdating }
            />
          )
        }
      </FormContainer>
    </>
  );
};

export default UsersForm;
