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
          width={ '90%' }
          $backgroundColor={ 'transparent' }
        >
          <Title1>Meus Projetos</Title1>
        </Article>

        <ProjectsComponent />
      </Container>
    </>
  );
};

export default Projects;
