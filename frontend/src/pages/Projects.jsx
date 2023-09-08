import React from 'react';
import NavBar from '../components/NavBar';
import Container from '../styled/Container';
import { Title1 } from '../styled/Titles';
import ProjectsComponent from '../components/ProjectsComp';
import Article from '../styled/Article';

const Projects = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Article
          $width={ '100%' }
          $backgroundColor={ 'transparent' }
        >
          <Title1>Meus Projetos</Title1>
        </Article>
      </Container>

      <Container>
        <ProjectsComponent />
      </Container>
    </>
  );
};

export default Projects;
