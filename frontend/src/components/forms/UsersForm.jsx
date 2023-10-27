import { useContext } from "react";
import { FormContainer, FormDiv100 } from "../../styled/Form";
import { Input, Select } from "../../styled/Inputs";
import { Label } from "../../styled/Labels";
import { LoginContext } from "../../context/Contexts";
import { requestCreateUser, requestGetUsers } from "../../helpers/loginApi";
import { CancelButton, SaveButton } from "../../styled/Buttons";

const UsersForm = () => {
  const {
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
    const token = localStorage.getItem('token');
    await requestCreateUser(registeringUser, token);

    stopUpdating();

    const users = await requestGetUsers();
    setUsers(users);
  };
  
  return (
    <>
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
              onClick={ () => {
                if (!isAdministrator) {
                  alert(
                    'Você não tem permissão para cadastrar usuários(as).'
                  );
                  return;
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
