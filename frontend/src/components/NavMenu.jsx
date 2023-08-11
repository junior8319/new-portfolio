import { Link } from 'react-router-dom';
import { InnerContent, NavBarMenu } from '../styled/Container';
import { NavMenuButton } from '../styled/Buttons';

const NavMenu = ({ handleMenuBtnClick }) => {
  return (
    <NavBarMenu>
      <InnerContent>
        <NavMenuButton
          onClick={ handleMenuBtnClick }
        >
          Fechar
        </NavMenuButton>
      </InnerContent>
      <Link to="/">Home</Link>
      <Link to="/contact-me">Contato</Link>
      <Link to="/articles">Artigos</Link>
      <Link to="/projects">Projetos</Link>
      <Link to="/administrator">Administrador</Link>
    </NavBarMenu>
  );
};

export default NavMenu;