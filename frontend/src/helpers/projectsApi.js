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
    const formData = new FormData();
    formData.append('title', receivedData.title);
    formData.append('snapshot', receivedData.snapshot);
    formData.append('description', receivedData.description);
    formData.append('startDate', receivedData.startDate);
    formData.append('finishDate', receivedData.finishDate);
    formData.append('projectUrl', receivedData.projectUrl);

    const uploadFormData = new FormData();
    uploadFormData.append('snapshot', receivedData.snapshot);

    const options = {
      method: 'POST',
      body: receivedData,
      mode: 'cors',
      headers: {
        'Access-control-Allow-Origin': API_ORIGIN,
      },
    };

    const uploadOptions = {
      method: 'POST',
      body: uploadFormData,
    };

    const uploadResponse = await fetch(`${API_URL}/upload`, uploadOptions);
    console.log('uploadResponse', uploadResponse);

    const response = await fetch(`${API_URL}/projects`, options);
    console.log(response);

    return response;
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

    const deleteFileOptions = {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': API_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    const deleteFileResponse = await fetch(
      `${API_URL}/files/delete/${projectToDelete.snapshot}`,
      deleteFileOptions
    );
    
    const options = {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': API_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    const deleteProjectResponse = await fetch(`${API_URL}/projects/${receivedId}`, options);
    const response = {
      file: deleteFileResponse,
      project: deleteProjectResponse
    };
    
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
