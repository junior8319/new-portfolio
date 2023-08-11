const API_URL = process.env.REACT_APP_BASE_URL;
const API_ORIGIN = process.env.REACT_APP_BASE_URL_ORIGIN;

const getStacks = async () => {
  try {
    const stacks = await fetch(`${API_URL}/stacks`);
    const stacksJson = await stacks.json();
    return stacksJson;
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};

const getStackById = async (id) => {
  try {
    const stack = await fetch(`${API_URL}/stacks/${id}`);
    const stackJson = await stack.json();
    return stackJson;
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};

const requestStackRegister = (receivedData) => {
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
    const response = fetch(`${API_URL}/stacks`, options)
      .then(response => response.json())
      .then(data => {
        return data.stack;
      });
    return response;
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};

const updateStackRequest = async (receivedId, updatedStack) => {
  try {
    const stackToUpdate = await getStackById(receivedId);
    if (!stackToUpdate) {
      return `Não foi possível encontrar registro com o ID: ${receivedId}`;
    }

    const options = {
      method: 'PUT',
      body: JSON.stringify(updatedStack),
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': API_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    const response = await fetch(`${API_URL}/stacks/${receivedId}`, options);

    return response;    
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};

const deleteStackRequest = async (receivedId) => {
  try {
    const stackToDelete = await getStackById(receivedId);
    if (!stackToDelete) {
      return `Não foi possível encontrar registro com o ID: ${receivedId}`;
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

    const response = await fetch(`${API_URL}/stacks/${receivedId}`, options);

    return response;    
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};


export {
  getStacks,
  getStackById,
  requestStackRegister,
  updateStackRequest,
  deleteStackRequest,
};
