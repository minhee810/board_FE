import React, { useContext, useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { UserObjContext } from "../../context/UserObjContext";

const LoginForm = () => {
  const [saveIDFlag, setSaveIDFlag] = useState(false);
  const LS_KEY_ID = "LS_KEY_ID";
  const LS_KEY_SAVE_ID_FLAG = "LS_KEY_SAVE_ID_FLAG";
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserObjContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log("handleChange() 호출");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("handleSubmit() 호출");
    e.preventDefault();
    console.log("email : ", formData.email);
    if (formData.email === "") {
      alert("이메일을 입력해주세요.");
      return false;
    }
    if (formData.password === "") {
      alert("비밀번호를 입력해주세요");
      return false;
    }

    if (saveIDFlag) {
      localStorage.setItem(LS_KEY_ID, formData.email);
    }

    try {
      const response = await api.post(`/api/login`, formData);

      let newUserData = response.data.data;

      if (newUserData) {
        localStorage.setItem("userData", JSON.stringify(response.data.data));
        setUserData(newUserData);
      }
      navigate("/");
    } catch (error) {
      console.log("error.status :", error.response.status);
    }
  };

  // 아이디 저장 체크박스 활성화
  const handleRememberId = () => {
    console.log("check 발생");
    // 로컬스토리지에 LS_KEY_SAVE_ID_FLAG 라는 키값으로 아이디 기억 버튼의 상태를 저장
    // 체크 ->  true 언체크 -> false
    // 기본 값이 false
    localStorage.setItem(LS_KEY_SAVE_ID_FLAG, !saveIDFlag);
    // 상태 변경해서 저장
    setSaveIDFlag(!saveIDFlag);
  };

  // 컴포넌트가 처음 마운트 될 때만 실행되도록 빈 배열을 두번째 인자로 넘김
  useEffect(() => {
    // 로컬스토리지에서 저장 활성화 버튼 여부
    let idFlag = JSON.parse(localStorage.getItem(LS_KEY_SAVE_ID_FLAG));
    // 저장 여부가 없을 경우 현재의 저장 여부를 저장
    if (idFlag !== null) setSaveIDFlag(idFlag);

    // 저장이 안되어 false일 경우 ""로 저장
    if (idFlag === false) localStorage.setItem(LS_KEY_ID, "");

    // storage 에서 꺼낸 값 id 값
    let data = localStorage.getItem(LS_KEY_ID);

    // 저장되어있는 값이 있을 경우
    // 데이터가 null이 아닐 경우
    if (data !== null) setFormData({ email: data });
  }, []);

  useEffect(() => {
    setUserData(userData);
  });
  return (
    <div className="bg-gradient-primary">
      <div className="container">
        {/* <!-- Outer Row --> */}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form className="user" id="loginForm">
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            className="form-control form-control-user"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            value={formData.email}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            autoComplete="off"
                            className="form-control form-control-user"
                            placeholder="Password"
                          />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              onChange={handleRememberId}
                              type="checkbox"
                              checked={saveIDFlag}
                              className="custom-control-input"
                              id="rememberId"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="rememberId"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <button
                          onClick={handleSubmit}
                          className="btn btn-primary btn-user btn-block"
                        >
                          로그인
                        </button>
                        <hr />
                      </form>
                      <div className="text-center">
                        <a className="small" href="register.html">
                          Create an Account!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
