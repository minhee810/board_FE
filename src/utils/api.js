import axios from "axios";
import { useNavigate } from "react-router-dom";
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
    // message 를 alert로 띄우지 않아도 되는 경우에 응답 코드 2로 전송
    if (code === 2) {
      console.log(response.data);
    }
    return response;
  },
  function (error) {
    console.log("error interceptor() 호출");
    if (error.response && error.response.status === 409) {
      if (error.response.data.code === -2) {
        console.log(error.response.data.msg);
      }
      // alert(error.response.data.msg);
    }
    if (error.response && error.response.status === 400) {
      alert(error.response.data.msg);
    }
    if (error.response && error.response.status === 401) {
      alert(error.response.data.msg);
      console.log("인증되지 않은 사용자의 접근입니다. 로그인을 진행해주세요.");
      sessionStorage.removeItem("userData");
    }

    if (error.response && error.response.status === 405) {
      alert("인증되지 않은 사용자의 접근입니다.");
      sessionStorage.removeItem("userData");
    }
    return Promise.reject(error);
    // return error;
  }
);
export default api;
