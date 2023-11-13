const API_URL = process.env.REACT_APP_BASE_URL;
const API_ORIGIN = process.env.REACT_APP_BASE_URL_ORIGIN;

export const getStacksProjectsRequest = async () => {
  try {
    const projects = await fetch(`${API_URL}/stacks-projects`);
    const projectsJson = await projects.json();

    return projectsJson;
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};

export const registerStackProjectRequest = async (receivedData) => {
  try {
    const response = await fetch(`${API_URL}/stacks-projects`, {
      method: 'POST',
      body: JSON.stringify(receivedData),
      mode: 'cors',
      headers: {
        'Access-control-Allow-Origin': API_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};