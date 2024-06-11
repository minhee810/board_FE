import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostCode from "../../services/PostCode";
import api from "../../utils/api";
import PasswordCheck from "../../components/PasswordCheck";
import { REPLACE_VALID } from "../../utils/validation";

export const JoinForm = () => {
  const navigate = useNavigate();
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    detailAddress: "",
    zipCode: "",
    note: "",
  });

  // useEffect 입력값 변경될 때 마다 검증하기
  useEffect(() => {}, []);

  // input 창 상태 관리 + replace 함수 호출
  const handleInputChange = (event, validType = "") => {
    console.log("handleInputChange() 호출");
    // 조합형 문자일 경우 그냥 리턴
    if (event.nativeEvent.isComposing) {
      return;
    } else {
      // 조합형 문자가 아닐 경우 REPLACE 함수 호출
      let { name, value } = event.target;
      // validType 이 주어진 경우 replace 하기
      if (validType) {
        const filteredValue = value.replace(REPLACE_VALID[validType], "");
        setFormData({ ...formData, [name]: filteredValue });
      } else {
        // 아닌 경우 바로 그냥 formDate에 넣어버려
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  // 비밀번호 자식 컴포넌트에서 가져온 값 저장
  const handlePasswordChange = (password) => {
    console.log("handlePasswordChange() 호출");
    setFormData({ ...formData, password: password });
  };

  // api :  사용자 이름 & 이메일 중복 확인
  const checkDuplicate = async (e) => {
    console.log("checkDuplicate() 호출");
    e.preventDefault();
    let name = e.target.name;
    let requsetURL = "";

    if (name === "username") {
      requsetURL = `/api/username/${formData.username}/check`;
    } else {
      requsetURL = `/api/email/${formData.email}/check`;
    }
    try {
      const response = await api.get(requsetURL);
    } catch (error) {
      console.log("response.status :", error.response.status);
    }
  };

  // api : 회원가입 버튼 클릭 시 폼 제출
  const handleFormSubmit = async (e) => {
    console.log("handleFormSubmit() 호출");
    e.preventDefault();
    try {
      console.log(formData);
      await api.post(`/join`, formData);
    } catch (error) {
      console.log("response.status :", error.response.status);
    }
  };
  return (
    <>
      <div className="bg-gradient-primary">
        <div className="container">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row">
                <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                <div className="col-lg-7">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">회원가입</h1>
                    </div>
                    {/* form start */}
                    <form className="user">
                      <div className="form-group">
                        <input
                          type="text"
                          name="username"
                          // onKeyUp={handleInputChange}
                          onChange={(e) => handleInputChange(e, "username")}
                          onBlur={checkDuplicate}
                          className="form-control form-control-user"
                          placeholder="이름"
                          ref={usernameRef}
                          value={formData.username}
                        />
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-9 mb-3 mb-sm-0">
                          <input
                            type="email"
                            name="email"
                            onChange={(e) => handleInputChange(e, "email")}
                            onBlur={checkDuplicate}
                            className="form-control form-control-user"
                            placeholder="이메일주소"
                            ref={emailRef}
                            value={formData.email}
                          />
                        </div>
                        <div className="col-sm-3">
                          <button
                            name="emailCheck"
                            onClick={checkDuplicate}
                            className="btn btn-primary btn-user btn-block"
                          >
                            중복확인
                          </button>
                        </div>
                      </div>
                      {/* password checker component */}
                      <PasswordCheck onDataChange={handlePasswordChange} />
                      <div className="form-group">
                        <input
                          type="phone"
                          name="phone"
                          onChange={(e) => handleInputChange(e, "phone")}
                          className="form-control form-control-user"
                          placeholder="휴대폰번호"
                          ref={phoneRef}
                          value={formData.phone}
                        />
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-9 mb-3 mb-sm-0">
                          <input
                            type="text"
                            name="address"
                            onChange={handleInputChange}
                            defaultValue={formData.address}
                            className="form-control form-control-user"
                            placeholder="주소"
                            readOnly
                          />
                        </div>
                        <div className="col-sm-3">
                          <PostCode setSignForms={setFormData} />
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="detailAddress"
                          onChange={handleInputChange}
                          className="form-control form-control-user"
                          placeholder="상세주소"
                        />
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="text"
                            name="zipCode"
                            defaultValue={formData.zipCode}
                            onChange={handleInputChange}
                            className="form-control form-control-user"
                            placeholder="우편번호"
                            readOnly
                          />
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="note"
                            name="note"
                            defaultValue={formData.note}
                            onChange={handleInputChange}
                            className="form-control form-control-user"
                            placeholder="참고사항"
                          />
                        </div>
                      </div>
                      <button
                        onClick={handleFormSubmit}
                        // type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Register Account
                      </button>
                    </form>
                    <hr />
                    <div className="text-center">
                      <Link className="small" to="/login">
                        Already have an account? Login!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
