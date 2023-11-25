import React,{ useContext, useEffect } from 'react';
import StacksForm from '../components/forms/StacksForm';
import StacksTable from '../components/tables/StacksTable';
import Article from '../styled/Article';
import Container from '../styled/Container';
import { Title1, Title2 } from '../styled/Titles';
import ProjectsForm from '../components/forms/ProjectsForm';
import ProjectsProvider from '../context/ProjectsProvider';
import ProjectsTable from '../components/tables/ProjectsTable';
import LoginForm from '../components/forms/LoginForm';
import Logout from '../components/Logout';
import { LoginContext } from '../context/Contexts';
import UsersForm from '../components/forms/UsersForm';
import UsersTable from '../components/tables/UsersTable';

const Administrator = () => {
  const { user, isLogged, isAdministrator, setIsAdministrator } = useContext(LoginContext);

  useEffect(() => {
    const userInStorage = JSON.parse(localStorage.getItem('user'));
    const tokenInStorage = JSON.parse(localStorage.getItem('token'));

    if (userInStorage) {
      setIsAdministrator(userInStorage.role === 'owner');
    }

    if (!userInStorage || !isLogged) {
      setIsAdministrator(false);
    }
  }, [user, isLogged, isAdministrator, setIsAdministrator]);

  if (!user || user.userName.length === 0 || !isLogged) {
    return (
      <Container>
        <LoginForm />
      </Container>
    );
  }

  return (
    <>
      <Container
        $width="100%"
        $flexWrap="wrap"
      >
        <Logout />
        <Title1>Administrador</Title1>

        <Article
          $maxHeight="fit-content"
          $margin="5px auto"
          $width="95%"
          $padding="7.5px"
        >
          <Title2>
            Cadastro de Habilidades e Ferramentas:
          </Title2>
          <StacksForm />
        </Article>

        <Article
          $width="95%"
          $margin="5px auto"
          $padding="7.5px"
        >
          <Title2>Habilidades:</Title2>
          <StacksTable />
        </Article>

        <ProjectsProvider>
          <Article
            $maxHeight="fit-content"
            $margin="5px auto"
            $width="95%"
            $padding="7.5px"
          >
            <Title2>Cadastro de Projetos:</Title2>
            <ProjectsForm />
          </Article>

          <Article
            $width="95%"
            $margin="5px auto"
            $padding="7.5px"
          >
            <Title2>Projetos:</Title2>
            <ProjectsTable />
          </Article>
        </ProjectsProvider>

        <Article
          $maxHeight="fit-content"
          $margin="5px auto"
          $width="95%"
          $padding="7.5px"
        >
          <Title2>Cadastro de Usuários(as):</Title2>
          <UsersForm />
        </Article>

        <Article
          $width="95%"
          $margin="5px auto"
          $padding="7.5px"
        >
          <Title2>Usuários(as):</Title2>
          <UsersTable />
        </Article>
      </Container>
    </>
  );
}

export default Administrator;
