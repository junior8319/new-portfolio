import { useContext } from "react";
import Article from "../styled/Article";
import { LoginContext } from "../context/Contexts";
import { SimpleP } from "../styled/Paragraphs";
import { CancelButton } from "../styled/Buttons";

const Logout = () => {
  const { setUser, setIsLogged, blankForm } = useContext(LoginContext);
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.clear();
    setUser(blankForm);
    setIsLogged(false);
  };

  return (
      <Article
        $display='flex'
        $justifyContent='flex-end'
        $width='100%'
        $padding='0'
        $backgroundColor='transparent'
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
