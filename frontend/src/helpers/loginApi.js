const API_URL = process.env.REACT_APP_BASE_URL;
const API_ORIGIN = process.env.REACT_APP_BASE_URL_ORIGIN;
const TOKEN = localStorage.getItem('token');

const requestLogin = async (receivedCredencials) => {
  try {
    const options = {
      method:'POST',
      body: JSON.stringify(receivedCredencials),
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': API_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    const response = fetch(`${API_URL}/users/login`, options)
    .then(response => response.json())
    .then(data => data);

    return response;
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};

const requestGetUsers = async () => {
  try {
    const options = {
      method:'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': API_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    const response = await fetch(`${API_URL}/users`, options);
    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};

const requestGetUserById = async (receivedId) => {
  try {
    const options = {
      method:'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': API_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    const user = await fetch(`${API_URL}/users/${receivedId}`, options);
    const jsonUser = await user.json();

    return jsonUser;
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};

const requestCreateUser = async (receivedUser, receivedCredentials) => {
  try {
    const userToRegister = {
      ...receivedUser,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const registerOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': API_ORIGIN,
        'Accept': 'application/json',
        Authorization: receivedCredentials,
      },
      body: JSON.stringify(userToRegister),
    };

    const registerResponse = await fetch(
      `${API_URL}/users/create`,
      registerOptions
    );

    const jsonResponse = await registerResponse.json();

    return jsonResponse;
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};

const requestUpdateUser = async (receivedId, receivedUser, receivedCredentials) => {
  try {
    let userToUpdate = await requestGetUserById(receivedId);
    if (!userToUpdate) {
      return `Não foi possível encontrar registro com o ID: ${receivedId}`;
    }
    userToUpdate = {
      ...userToUpdate,
      ...receivedUser,
      updatedAt: new Date(),
    };

    const options = {
      method: 'PUT',
      body: JSON.stringify(userToUpdate),
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': API_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: receivedCredentials,
      },
    };

    const response = await fetch(`${API_URL}/users/${receivedId}`, options);

    return response;
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};

const requestDeleteUser = async (id) => {
  try {
    const otpions = {
      method:'DELETE',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': API_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': TOKEN,
      },
    };

    const response = await fetch(`${API_URL}/users/${id}`, otpions);
    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};

export {
  requestLogin,
  requestGetUsers,
  requestDeleteUser,
  requestCreateUser,
  requestUpdateUser,
};
