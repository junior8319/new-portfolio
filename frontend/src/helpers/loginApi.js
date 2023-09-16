const API_URL = process.env.REACT_APP_BASE_URL;
const API_ORIGIN = process.env.REACT_APP_BASE_URL_ORIGIN; 

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
    .then(data => {
      return data;
    });
  
    return response;  
  } catch (error) {
    console.log(error);
    return new Error(`Something went wrong. Error: ${error}`);
  }
};

export { requestLogin };