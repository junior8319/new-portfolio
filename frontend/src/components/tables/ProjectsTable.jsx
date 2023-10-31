import { useContext } from 'react';
import { LoginContext, ProjectsContext } from '../../context/Contexts';
import { Title3 } from '../../styled/Titles';
import { Col, ColBtnDiv, ColDeleteBtn, ColUpdateBtn, HeadCol, Row, Table, TableBody, TableContainer, TableHead } from '../../styled/Table';
import NavLink from '../../styled/Link';
import { getProjects, requestProjectDelete } from '../../helpers/projectsApi';
import { handleDateCompatibility, handleTimeZoneCompatibility } from '../../helpers/handleCompatibility';

const ProjectsTable = () => {
  const {
    projects,
    setIsUpdating,
    setProject,
    setProjects,
  } = useContext(ProjectsContext);

  const { isAdministrator } = useContext(LoginContext);

  const selectToUpdate = (tableProject) => {
    setIsUpdating(true);

    setProject({
      id: tableProject.id,
      title: tableProject.title,
      description: tableProject.description,
      projectUrl: tableProject.projectUrl,
      snapshot: tableProject.snapshot,
      startDate: handleDateCompatibility(tableProject.startDate),
      finishDate: handleDateCompatibility(tableProject.finishDate),
      stacks: tableProject.Stacks,
    });
  };

  if (!projects || projects.length === 0)
    return <Title3>Sem projetos cadastrados</Title3>;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <Row>
            <HeadCol>ID</HeadCol>
            <HeadCol>Título</HeadCol>
            <HeadCol>URL</HeadCol>
            <HeadCol>Início</HeadCol>
            <HeadCol>Conclusão</HeadCol>
            <HeadCol>Ações</HeadCol>
          </Row>
        </TableHead>
        <TableBody>
          { projects.map((tableProject) => {
            const {
              id,
              title,
              projectUrl,
            } = tableProject;

            let { startDate, finishDate } = tableProject;
            startDate = handleTimeZoneCompatibility(startDate);
            finishDate = handleTimeZoneCompatibility(finishDate);

            return (
              <Row key={`${id}#$%${title}`}>
                <Col data-label='ID: '>{id}</Col>
                <Col data-label='Título: '>{title}</Col>
                <Col data-label='URL: '>
                  <NavLink
                    href={projectUrl}
                    color="#488AFA"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {projectUrl}
                  </NavLink>
                </Col>
                <Col data-label='Início: '>{startDate}</Col>
                <Col data-label='Conclusão: '>{finishDate}</Col>

                <Col data-label='Ações: '>
                  <ColBtnDiv>
                    <ColUpdateBtn
                      onClick={() => selectToUpdate(tableProject)}
                    >
                      Alterar
                    </ColUpdateBtn>

                    <ColDeleteBtn
                      onClick={() => {
                        if (!isAdministrator) {
                          return alert('Você não tem permissão para apagar projetos');
                        };

                        const confirmDelete = window.confirm(
                          `Deseja deletar o projeto ${title}?`
                        );

                        (confirmDelete) && requestProjectDelete(tableProject.id)
                          .then(() => {
                            getProjects().then((response) => setProjects(response));
                          })
                          .catch((err) => console.log(err));
                      }}
                    >
                      Deletar
                    </ColDeleteBtn>
                  </ColBtnDiv>
                </Col>
              </Row>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectsTable;
