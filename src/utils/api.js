import axios from "axios";

const api = axios.create({});

// request 인터셉터
api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// response 인터셉터
api.interceptors.response.use(
  function (response) {
    const code = response.data.code;
    if (code === 1) {
      alert(response.data.msg);
    }
    return response;
  },
  function (error) {
    console.log("reponse interceptor() 호출");
    if (error.response && error.response.status === 409) {
      alert(error.response.data.msg);
    }
    return Promise.reject(error);
  }
);
export default api;
