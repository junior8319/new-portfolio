import { FormContainer, FormDiv100 } from "../../styled/Form";
import { Input } from "../../styled/Inputs";
import { Label } from "../../styled/Labels";
import { Title2 } from "../../styled/Titles";

const UsersForm = () => {
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
            name="name"
            type="text"
            // value={user.userName}
            // onChange={handleChange}
          />`
        </FormDiv100>

        <FormDiv100>
          <Label htmlFor="input-password">
            Senha:
          </Label>

          <Input
            id="input-password"
            name="password"
            type="password"
            // value={user.password}
            // onChange={handleChange}
          />
        </FormDiv100>

        <FormDiv100>
          <Label htmlFor="input-role">
            Função:
          </Label>

          <select name="role" id="role">
            <option value="owner">Administrador(a)</option>
            <option value="visitor">Visitante</option>
          </select>
        </FormDiv100>
      </FormContainer>
    </>
  );
};

export default UsersForm;
