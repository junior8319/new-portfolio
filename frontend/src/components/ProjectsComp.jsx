import { useEffect, useState } from 'react';
import { getProjects } from '../helpers/projectsApi';
import Article from '../styled/Article';
import Loading from './Loading';
import { Title2, Title3 } from '../styled/Titles';
import { ProjectPicture } from '../styled/Pictures';
import { SimpleP } from '../styled/Paragraphs';
import { Tag } from '../styled/Spans';
import Link from '../styled/Link';

const ProjectsComponent = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects()
    .then(data => setProjects(data));
  }, []);

  useEffect(() => {}, [projects]);

  const API_BASE = process.env.REACT_APP_BASE_URL;

  return (
    (projects && projects.length)
    ? projects.map((project) => {
      return (
      <Article
        key={project.id}
        $width={ '45%' }
        $maxHeight={ '90%' }
      >
        <Article
          $width={ '90%' }
          $margin={ 'auto' }
          $backgroundColor={ 'transparent' }
        >
          <Title2>{ project.title }</Title2>
        </Article>
        <Article
          $width={ '90%' }
          $margin={ 'auto' }
          $backgroundColor={ 'transparent' }
          $textAlign={ 'center' }
        >
          <ProjectPicture
            src={ `${API_BASE}/images/${project.snapshot}` }
          />
        </Article>

        <Article
          $margin={ 'auto' }
          $width={ '90%' }
          $backgroundColor={ 'transparent' }
        >
          <SimpleP>{ project.description }</SimpleP>
        </Article>

        <Article
          $margin={ 'auto' }
          $backgroundColor={ 'transparent' }
          $width={ '90%' }
          $display={ 'flex' }
          $justifyContent={ 'baseline' }
        >
          <Title3>Data de início:</Title3>
          <SimpleP>
            {
              (project.startDate)
              ?
                new Date(project.startDate).toLocaleDateString()
              :
                'Ainda não iniciado.'
            }
          </SimpleP>
        </Article>
        
        <Article
          $margin={ 'auto' }
          $backgroundColor={ 'transparent' }
          $width={ '90%' }
          $display={ 'flex' }
          $justifyContent={ 'baseline' }
        >
          <Title3>Data de conclusão:</Title3>
          <SimpleP>
            { (project.finishDate)
              ?
                new Date(project.finishDate).toLocaleDateString()
              :
                'Em desenvolvimento.'
            }
          </SimpleP>
        </Article>

        <Article
          $backgroundColor={ 'transparent' }
          $width={ '90%' }
          $margin={ 'auto' }
        >
          <Link
            to={`${project.projectUrl}`}
            target={ '_blank' }
            rel={ 'noopener noreferrer' }
          >
            <Title3>
              Clique aqui para visitar o projeto.
            </Title3>
          </Link>
        </Article>

        <Article
          $margin={ '0 auto 15px auto' }
          $backgroundColor={ 'transparent' }
          $width={ '90%' }
          $display={ 'flex' }
          $justifyContent={ 'baseline' }
        >
          <Title3>Ferramentas usadas:</Title3>
          {
            (project.Stacks && project.Stacks.length > 0)
            ?
              project.Stacks
              .map((stack) => 
                <Tag key={stack.id}>
                  {stack.title}
                </Tag>
              )
            :
              'Ferramentas não definidas.'
          }
        </Article>
      </Article>
    )})
    : (
      <Article>
        <Loading />
      </Article>
    )
  );
};

export default ProjectsComponent;
