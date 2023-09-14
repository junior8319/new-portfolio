import { useContext } from "react";
import Article from "../styled/Article";
import { LoginContext } from "../context/Contexts";
import { SimpleP } from "../styled/Paragraphs";
import { CancelButton } from "../styled/Buttons";

const Logout = () => {
  const { user, setUser, setIsLogged, blankForm } = useContext(LoginContext);

  const logout = () => {
    setUser(blankForm);
    setIsLogged(false);
  };

  return (
      <Article
        $display='flex'
        $justifyContent='flex-end'
        $width='100%'
        $padding='0'
      >
        <SimpleP
          $textAlign='right'
          $padding='0 20px'
        >
          Olá, { `${user.userName}` }
          <CancelButton
            type='button'
            value='Sair'
            onClick={ logout }
            $margin='0 0 0 10px'
            $width='fit-content'
            $borderRadius='20px'
          />
        </SimpleP>
      </Article>
  );
};

export default Logout;
