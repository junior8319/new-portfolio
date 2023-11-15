import { registerStackProjectRequest } from "./stacksProjectsApi";

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

const registerProjectRequest = async (receivedData) => {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(receivedData),
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': API_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    const response = await fetch(`${API_URL}/projects`, options);
    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};

const uploadSnapshot = async (snapshot) => {
  try {
    const options = {
      method: 'POST',
      body: snapshot,
    };

    const response = await fetch(`${API_URL}/upload`, options);
    const responseJson = await response.json();

    if (responseJson.error || !responseJson.file || responseJson.file.length === 0) {
      console.log(responseJson.error);
      return new Error(`Unable to upload snapshot. Error: ${responseJson.error}`);
    }

    return responseJson;
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};

const registerProject = async (receivedData) => {
  try {
    if (!receivedData.snapshot || receivedData.snapshot.length === 0) {
      return registerProjectRequest(receivedData);
    }

    const formData = new FormData();
    formData.append('snapshot', receivedData.snapshot);

    const snapshot  = await uploadSnapshot(formData);

    const response = await registerProjectRequest({
      ...receivedData,
      snapshot: snapshot.file.filename,
    });

    if (
      response
      && response.project
      && receivedData.stacks
      && receivedData.stacks.length > 0
    ) {
      const projectId = response.project.id;
      const stacksIds = receivedData.stacks.map((stack) => stack.id);


      stacksIds.forEach(async (stackId) => {
        const newStackProject = {
          projectId,
          stackId,
        };

        await registerStackProjectRequest(newStackProject);
      });
    }

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
  registerProject,
  requestProjectUpdate,
  requestProjectDelete,
};
