import { deleteStackProjectRequest, getStackProjectByPKRequest, registerStackProjectRequest } from "./stacksProjectsApi";

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

const deleteSnapshot = async (snapshot) => {
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
    `${API_URL}/files/delete/${snapshot}`,
    deleteFileOptions
  );

  return deleteFileResponse;
};

const associateStacksToProject = async (projectId, stacks) => {
  const stacksIds = stacks.map((stack) => stack.id);

  stacksIds.forEach(async (stackId) => {
    const stackProject = await getStackProjectByPKRequest(stackId, projectId);
    if (!stackProject.stackId || !stackProject.projectId) {
      const newStackProject = {
        projectId,
        stackId,
      };

      await registerStackProjectRequest(newStackProject);
    }
  });
};

const dissociateStacksFromProject = async (projectId, stacks) => {
  const stacksIds = stacks.map((stack) => stack.id);

  const responses = stacksIds.map(async (stackId) => {
    const stackProject = await getStackProjectByPKRequest(stackId, projectId);

    if (stackProject.stackId && stackProject.projectId) {
      const deleteResponse = await
        deleteStackProjectRequest(stackId, projectId);
      return deleteResponse;
    }
  });

  return responses;
};

const setStacksProjectsToAssociate = async (updatedStacks, toUpdateStacks) => {
  const stacksToAssociate = updatedStacks.filter((stack) => {
    const stackToUpdate = toUpdateStacks.find((toUpdateStack) => {
      return stack.id === toUpdateStack.id;
    });

    return !stackToUpdate;
  });

  return stacksToAssociate;
};

const setStacksProjectsToDissociate = async (updatedStacks, toUpdateStacks) => {
  const stacksToDissociate = toUpdateStacks.filter((stack) => {
    const stackToUpdate = updatedStacks.find((updatedStack) => {
      return stack.id === updatedStack.id;
    });

    return !stackToUpdate;
  });

  return stacksToDissociate;
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
      await associateStacksToProject(projectId, receivedData.stacks);
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
    
    const stacksToAssociate = await setStacksProjectsToAssociate(
      updatedProject.stacks,
      projectToUpdate.Stacks
    );
    
    const stacksToDissociate = await setStacksProjectsToDissociate(
      updatedProject.stacks,
      projectToUpdate.Stacks
    );

    await associateStacksToProject(receivedId, stacksToAssociate);
    await dissociateStacksFromProject(receivedId, stacksToDissociate);
    
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

const updateProject = async (updatedProject) => {
  try {
    if (!updatedProject.snapshot || updatedProject.snapshot.length === 0) {
      return requestProjectUpdate(updatedProject.id, updatedProject);
    }
    
    const projectToUpdate = await getProjectById(updatedProject.id);
    
    const imageToDelete = await fetch(
      `${API_URL}/images/${projectToUpdate.snapshot}`
    );
    
    if (
          imageToDelete
          && imageToDelete.status === 200
          && projectToUpdate.snapshot !== updatedProject.snapshot
      ) {
          const formData = new FormData();
          formData.append('snapshot', updatedProject.snapshot);
          await deleteSnapshot(projectToUpdate.snapshot);
    }
    
    if (!updatedProject.snapshot || updatedProject.snapshot.length === 0) {
      return requestProjectUpdate(updatedProject.id, updatedProject);
    }
    
    const formData = new FormData();
    formData.append('snapshot', updatedProject.snapshot);

    const snapshot  = await uploadSnapshot(formData);

    const response = await requestProjectUpdate(
      updatedProject.id,
      {
        ...updatedProject,
        snapshot: snapshot.file.filename,
      }
    );

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

    const imageToDelete = await fetch(
      `${API_URL}/images/${projectToDelete.snapshot}`,
      deleteFileOptions
    );

    const deleteFileResponse = (imageToDelete && imageToDelete.length > 0)
    ?
      await fetch(
        `${API_URL}/files/delete/${projectToDelete.snapshot}`,
        deleteFileOptions
      )
    :
      "No image to delete";
    
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
  updateProject,
  requestProjectUpdate,
  requestProjectDelete,
};
