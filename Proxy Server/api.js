const axios = require('axios');

let baseURL = "http://localhost";
let port = ":1337"

const sendData = async (endpoint,data) => {
  //console.log(data.task);
  try {
    console.log(baseURL + port);
    const response = await axios.post(baseURL + port + "/" + endpoint, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error(response.status + " " + response.statusText);
    }

    const result = response.data;
    console.log(result);

    return result;
  } catch (error) {
    console.error('Error sending data to server:', error);
    return { htmlError: error };
  }
};

module.exports = sendData;
