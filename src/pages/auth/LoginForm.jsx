import React, { useEffect, useState } from "react";
import api from "../../utils/api";

const LoginForm = () => {
  const [saveIDFlag, setSaveIDFlag] = useState(false);
  const LS_KEY_ID = "LS_KEY_ID";
  const LS_KEY_SAVE_ID_FLAG = "LS_KEY_SAVE_ID_FLAG";
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
      console.log("formData : ", formData);
    } catch (error) {
      console.log("error.status :", error.response.status);
    }
  };

  const handleRememberId = () => {
    localStorage.setItem(LS_KEY_SAVE_ID_FLAG, !saveIDFlag);
    setSaveIDFlag(!saveIDFlag);
  };

  useEffect(() => {
    let idFlag = JSON.parse(localStorage.getItem(LS_KEY_SAVE_ID_FLAG));
    if (idFlag !== null) setSaveIDFlag(idFlag);
    if (idFlag === false) localStorage.setItem(LS_KEY_ID, "");
    let data = localStorage.getItem(LS_KEY_ID);
    if (data !== null) setLoginId(data);
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
                              onClick={handleRememberId}
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
