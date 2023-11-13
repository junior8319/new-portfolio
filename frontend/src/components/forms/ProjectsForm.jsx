import { useContext, useEffect, useState } from 'react';
import { Label, Span } from '../../styled/Labels';
import { Input, TextArea } from '../../styled/Inputs';
import { CancelButton, SaveButton } from '../../styled/Buttons';
import { LoginContext, ProjectsContext, StacksContext } from '../../context/Contexts';
import { FormContainer, FormDiv100, FormDiv25 } from '../../styled/Form';
import { getProjects } from '../../helpers/projectsApi';
import { Title3 } from '../../styled/Titles';

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

  const { stacks } = useContext(StacksContext);

  useEffect(() => {}, [isAdministrator]);

  const handleChange  = (event) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleStacksSpanColor = (stack) => {
    const stackFound = (project.stacks && project.stacks.length > 0)
    ?
       project.stacks
       .find((projectStack) => projectStack.id === stack.id)
    :
      false;

    if (stackFound) {
      return {
        background: '#13890f60',
        text: '#e1dbdb',
        checked: true,
      };
    }

    return {
      background: '#e1dbdb50',
      text: '#b9d6f4',
      checked: false,
    };
  };

  const toggleStackOfProject = async (stack) => {
    if (!project.stacks || project.stacks.length === 0) {
      await setProject({ ...project, stacks: [stack] });
      handleStacksSpanColor(stack);
      return;
    }
    
    const stackFound = await project.stacks
    .find((projectStack) => projectStack.id === stack.id);

    if (stackFound) {
      const newStacks = await project.stacks
      .filter((projectStack) => projectStack.id !== stack.id);

      await setProject({ ...project, stacks: newStacks });
      handleStacksSpanColor(stack);
      return;
    }

    await setProject({ ...project, stacks: [...project.stacks, stack] });

    handleStacksSpanColor(stack);
    return;
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
  
      const updateResponse = await fetch(
        `${BASE_URL}/projects/${project.id}`,
        updateOptions
      );
      await updateResponse.json();

      stopUpdating();

      getProjects()
      .then(data => setProjects(data));
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

    const updateResponse = await fetch(`${BASE_URL}/projects/${project.id}`, updateOptions);
    await updateResponse.json();

    stopUpdating();

    getProjects()
    .then(data => setProjects(data));
    return;
  };


  const stopUpdating = () => {
    setIsUpdating(false);

    setProject(initialProject);
  };

  return (
    <>
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

        <FormDiv25>
          <Title3>Ferramentas:</Title3>
          <FormDiv100>
            { stacks.map((stack) => (
              <Span
                key={ stack.id }
                $backgroundColor={ handleStacksSpanColor(stack).background }
                $color={ handleStacksSpanColor(stack).text }
                $padding="5px"
                onClick={ () => toggleStackOfProject(stack) }
              >
                { stack.title }
                { handleStacksSpanColor(stack).checked
                  ?
                    <Span
                      $backgroundColor="#89250f"
                      $borderRadius="40px"
                      $padding="3px 6px"
                      $fontSize="0.8rem"
                      $margin="auto 3px"
                    >
                      X
                    </Span>
                  :
                    false
                }
              </Span>
            )) }
          </FormDiv100>
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
