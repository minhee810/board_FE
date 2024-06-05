import axios from "axios";

const api = axios.create({
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // 다른 도메인에 요청을 보낼 때 요청에 인증 정보를 담아서 보낼 지 결정하는 항목
  // 쿠키나 인증 헤더 정보를 포함시켜 요청하고 싶다면 클라이언트에서 api 요청 메서드를 보낼 때 true로 설정해서 보내야함.
  // 서버에서도 Access-Control-Allow-Credentials 헤더를 true로 설정해서 보내야함.
});

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
    if (error.response && error.response.status === 400) {
      alert(error.response.data.msg);
    }
    return Promise.reject(error);
  }
);
export default api;
