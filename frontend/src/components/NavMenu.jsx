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
      <Link to="/" onClick={ handleMenuBtnClick }>Home</Link>
      <Link to="/contact-me" onClick={ handleMenuBtnClick }>Contato</Link>
      <Link to="/articles" onClick={ handleMenuBtnClick }>Artigos</Link>
      <Link to="/projects" onClick={ handleMenuBtnClick }>Projetos</Link>
      <Link to="/administrator" onClick={ handleMenuBtnClick }>Administrador</Link>
    </NavBarMenu>
  );
};

export default NavMenu;