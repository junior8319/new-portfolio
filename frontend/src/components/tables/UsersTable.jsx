import { useContext } from 'react';
import { LoginContext } from '../../context/Contexts';
import { Title3 } from '../../styled/Titles';
import {
  Col,
  ColBtnDiv,
  ColDeleteBtn,
  ColUpdateBtn,
  HeadCol,
  Row,
  Table,
  TableBody,
  TableContainer,
  TableHead
} from '../../styled/Table';
import { requestDeleteUser, requestGetUsers } from '../../helpers/loginApi';

const UsersTable = () => {
  const {
    mappedUsers,
    setRegisteringUser,
    setUsers,
    setIsUpdating,
    isAdministrator
  } = useContext(LoginContext);

  const selectToUpdate = (tableUser) => {
    setIsUpdating(true);

    setRegisteringUser({
      id: tableUser.id,
      userName: tableUser.userName,
      role: tableUser.role,
    });
  };

  const sendDeleteRequest = async (receivedId) => {
    if (!isAdministrator) {
      alert('Você não tem permissão para excluir usuários');
      return;
    }

    const confirmDelete = window
    .confirm('Tem certeza que deseja excluir este usuário?');

    if (!confirmDelete) return;

    const response = await requestDeleteUser(receivedId);

    if (response && response.user) {
      const listToUpdate = await requestGetUsers();
      setUsers(listToUpdate);
    }

    return response;
  };

  const handleRoleToShow = (role) => {
    if (role === 'owner') return 'Administrador';
    if (role === 'visitor') return 'Visitante';

    return 'Usuário';
  };

  if (!mappedUsers || mappedUsers.length === 0) return <Title3>Sem usuários cadastrados</Title3>

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <Row>
            <HeadCol>ID</HeadCol>
            <HeadCol>Nome</HeadCol>
            <HeadCol>Função</HeadCol>
            <HeadCol>Ações</HeadCol>
          </Row>
        </TableHead>

        <TableBody>
          {
            mappedUsers.map((user) => {
              const {
                id,
                userName,
                role,
              } = user;

              return (
                <Row key={id}>
                  <Col data-label='ID: '>{id}</Col>
                  <Col data-label='Nome: '>{userName}</Col>
                  <Col data-label='Função: '>{handleRoleToShow(role)}</Col>
                  <Col data-label='Ações: '>
                    <ColBtnDiv>
                      <ColUpdateBtn
                        onClick={ () => selectToUpdate(user) }
                      >
                        Alterar
                      </ColUpdateBtn>

                      <ColDeleteBtn
                        onClick={ () => sendDeleteRequest(id)}
                      >
                        Excluir
                      </ColDeleteBtn>
                    </ColBtnDiv>
                  </Col>
                </Row>
              );
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
