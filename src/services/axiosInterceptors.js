import axios from 'axios';

const api = axios.create({
  baseURL: 'https://raw.githubusercontent.com/roman-curse/videoJson/master/videoJson.json',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    console.log('request: ', config);
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    console.log('response: ', response);
    return response;
  },
  (error) => {
    if (!error.response) {
      alert('Network Error!');
    }

    if (error && error.response && error.response.status >= 500) {
      alert(`Server Error. ${error.message}`);
    }

    return Promise.reject(error);
  },
);

export default api;
