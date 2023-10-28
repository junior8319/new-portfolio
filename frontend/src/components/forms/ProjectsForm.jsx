import { useContext, useEffect, useState } from 'react';
import { Title2 } from '../../styled/Titles';
import { Label } from '../../styled/Labels';
import { Input, TextArea } from '../../styled/Inputs';
import { CancelButton, SaveButton } from '../../styled/Buttons';
import { LoginContext, ProjectsContext } from '../../context/Contexts';
import { FormContainer, FormDiv100, FormDiv25 } from '../../styled/Form';
import { getProjects } from '../../helpers/projectsApi';

const ProjectsForm = () => {
  const API_ORIGIN = process.env.REACT_APP_BASE_URL_ORIGIN;
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const initialProject = {
    title: '',
    description: '',
    snapshot: '',
    projectUrl: '',
    startDate: '',
    finishDate: '',
  };

  const [file, setFile] = useState(null);

  const {
    project,
    setProject,
    isUpdating,
    setIsUpdating,
    setProjects,
  } = useContext(ProjectsContext);

  const { isAdministrator } = useContext(LoginContext);

  useEffect(() => {}, [isAdministrator]);

  const handleChange  = (event) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const sendRegisterRequest = async () => {
    const formData = new FormData();
    formData.append('snapshot', file);

    const uploadOptions = {
      method: 'POST',
      body: formData,
    };

    const uploadResponse = await fetch(`${BASE_URL}/upload`, uploadOptions);
    const data = await uploadResponse.json();

    if (data.error || !data.file || data.file.length === 0) {
      alert(`Erro ao enviar arquivo! ${data.error}`);
      return;
    }

    setProject({ ...project, snapshot: data.file.filename });

    const registerOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': API_ORIGIN,
      },
      body: JSON.stringify({
        ...project,
        snapshot: data.file.filename,
      }),
    };

    const registerResponse = await fetch(`${BASE_URL}/projects`, registerOptions);
    await registerResponse.json();

    stopUpdating();

    getProjects()
    .then(data => setProjects(data));
  };

  const sendUpdateRequest = async () => {
    if (file && file.name.length > 0) {
      const formData = new FormData();
      formData.append('snapshot', file);

      const uploadOptions = {
        method: 'POST',
        body: formData,
      };

      const uploadResponse = await fetch(`${BASE_URL}/upload`, uploadOptions);
      const data = await uploadResponse.json();

      if (data.error || !data.file || data.file.length === 0) {
        alert(`Erro ao enviar arquivo! ${data.error}`);
        return;
      }

      setProject({ ...project, snapshot: data.file.filename });
  
      const updateOptions = {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': API_ORIGIN,
        },
        body: JSON.stringify({
          ...project,
          snapshot: data.file.filename,
        }),
      };
  
      const registerResponse = await fetch(
        `${BASE_URL}/projects/${project.id}`,
        updateOptions
      );
      await registerResponse.json();
      return;
    }


    const updateOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': API_ORIGIN,
      },
      body: JSON.stringify(project),
    };

    const registerResponse = await fetch(`${BASE_URL}/${project.id}`, updateOptions);
    await registerResponse.json();

    stopUpdating();

    getProjects()
    .then(data => setProjects(data));
  };


  const stopUpdating = () => {
    setIsUpdating(false);

    setProject(initialProject);
  };

  return (
    <>
      <Title2>Cadastro de Projetos</Title2>

      <FormContainer
        method="post"
        encType="multipart/form-data"
      >
        <FormDiv25>
          <Label
            htmlFor="title"
          >
            Título:
          </Label>

          <Input
            id="title"
            name="title"
            type="text"
            value={ project.title }
            onChange={ handleChange }
          />
        </FormDiv25>

        <FormDiv25>
          <Label
            htmlFor="projectUrl"
          >
            URL do projeto:
          </Label>

          <Input
            id="projectUrl"
            name="projectUrl"
            type="text"
            value={ project.projectUrl }
            onChange={ handleChange }
          />
        </FormDiv25>

        <FormDiv25>
          <Label
            htmlFor="startDate"
          >
            Data de início:
          </Label>

          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={ project.startDate }
            onChange={ handleChange }
          />
        </FormDiv25>

        <FormDiv25>
          <Label
            htmlFor="finishDate"
          >
            Data de término:
          </Label>

          <Input
            id="finishDate"
            name="finishDate"
            type="date"
            value={ project.finishDate }
            onChange={ handleChange }
          />
        </FormDiv25>

        <FormDiv25>
          <Label
            htmlFor="snapshot"
          >
            Snapshot:
          </Label>

          <Input
            id="snapshot"
            name="snapshot"
            type="file"
            accept="image/*"
            onChange={ handleFileChange }
          />
        </FormDiv25>

        <FormDiv100>
          <Label
            htmlFor="description"
          >
            Descrição:
          </Label>

          <TextArea
            id="description"
            name="description"
            type="textarea"
            cols={ 30 }
            rows={ 6 }
            value={ project.description }
            onChange={ handleChange }
          />
        </FormDiv100>

        { !isUpdating
          ?
          (
            <SaveButton
              type='button'
              value='Salvar'
              onClick={ (event) => {
                event.preventDefault();
                if (!isAdministrator) {
                  setProject(initialProject);
                  return alert(
                  'Você não tem permissão para cadastrar projetos!'
                  );
                }
                sendRegisterRequest();
              }}
            />
          )
          :
          (
            <SaveButton
              type='button'
              value='Alterar'
              onClick={ (event) => {
                event.preventDefault();
                if (!isAdministrator) {
                  stopUpdating();
                  return alert(
                    'Você não tem permissão para alterar projetos!'
                  );
                }
                sendUpdateRequest();
              }}
            />
          )
        }

        {
          isUpdating
          && (
            <CancelButton
              type='button'
              value='Cancelar'
              onClick={ stopUpdating }
            />
          )
        }
      </FormContainer>
    </>
  );
};

export default ProjectsForm;
