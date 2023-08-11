const API_URL = process.env.REACT_APP_BASE_URL;
const API_ORIGIN = process.env.REACT_APP_BASE_URL_ORIGIN;

const getProjects = async () => {
  try {
    const projects = await fetch(`${API_URL}/projects`);
    const projectsJson = await projects.json();

    return projectsJson;
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};

const getProjectById = async (id) => {
  try {
    const project = await fetch(`${API_URL}/projects/${id}`);
    const projectJson = await project.json();

    return projectJson;
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};

const requestProjectRegister = async (receivedData) => {
  try {
    console.log('receivedData', receivedData);
    const options = {
      method: 'POST',
      // body: JSON.stringify(receivedData),
      body: receivedData,
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': API_ORIGIN,
        // 'Content-Type': 'application/json',
        // 'Accept': 'multipart/form-data',
      },
    };
    
    const response = await fetch(`${API_URL}/upload`, options);
    console.log('response', response);

    // const options = {
    //   method: 'POST',
    //   body: JSON.stringify(receivedData),
    //   mode: 'cors',
    //   headers: {
    //     'Access-Control-Allow-Origin': API_ORIGIN,
    //     'Content-Type': 'application/json',
    //   },
    // };

    // const response = await fetch(`${API_URL}/projects`, options);
    // const jsonResponse = await response.json();
    // const createdProject = await jsonResponse.project;

    // return createdProject;
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};

const requestProjectUpdate = async (receivedId, updatedProject) => {
  try {
    const projectToUpdate = await getProjectById(receivedId);
    if (!projectToUpdate) {
      return `Não foi possível encontrar projeto com o ID: ${receivedId}`;
    }

    const options = {
      method: 'PUT',
      body: JSON.stringify(updatedProject),
      mode: 'cors',
      headers: {
        'Access-control-Allow-Origin': API_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    const response = await fetch(`${API_URL}/projects/${receivedId}`, options);
    return response;
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};

const requestProjectDelete = async (receivedId) => {
  try {
    const projectToDelete = await getProjectById(receivedId);
    if (!projectToDelete) {
      return `Não foi possível encontrar projeto com o ID: ${receivedId}`;
    }

    const options = {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': API_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    const response = await fetch(`${API_URL}/projects/${receivedId}`, options);
    return response;
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};

export {
  getProjects,
  getProjectById,
  requestProjectRegister,
  requestProjectUpdate,
  requestProjectDelete,
};
