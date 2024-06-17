import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostCode from "../../services/PostCode";
import api from "../../utils/api";
import PasswordCheck from "../../components/PasswordCheck";
import { REPLACE_VALID, regExpFields } from "../../utils/validation";
import {
  checkDuplicateEmail,
  checkDuplicateUsername,
} from "../../services/auth/JoinService";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { hintMsg } from "../../utils/message";

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
  const { validText, setValidText } = useState("");
  const { isValid, setIsValid } = useState({
    isUsername: false,
    isEmail: false,
    isPassword: false,
    isPasswordConfirm: false,
  });

  // input 창 상태 관리 + replace 함수 호출
  const handleInputChange = (event, validType = "") => {
    let { name, value, dataSet } = event.target;
    // validType 이 주어진 경우 replace 하기
    console.log("value :", value);
    setFormData({ ...formData, [name]: value });
    if (!value.trim()) {
      alert(+"을 입력해주세요.");
    }
    if (validType) {
      console.log(validType);
      const filteredValue = value.replace(REPLACE_VALID[validType], "");
      setFormData({ ...formData, [name]: filteredValue });
    } else {
      // 아닌 경우 바로 그냥 formDate에 넣어버려
      setFormData({ ...formData, [name]: value });
    }
  };

  // 비밀번호 자식 컴포넌트에서 가져온 값 저장
  const handlePasswordChange = (password) => {
    console.log("handlePasswordChange() 호출");
    setFormData({ ...formData, password: password });
  };

  // api :  사용자 이름 & 이메일 중복 확인
  const checkDuplicate = async (event) => {
    console.log("checkDuplicate() 호출");
    event.preventDefault();
    let name = event.target.name;
    if (name === "username") {
      const result = regExpFields(event);
      console.log("result : ", result);
      if (!result) {
        alert(hintMsg.username);
        return false;
        // usernameRef.current.focus();
      }
      const response = checkDuplicateUsername(formData.username);
      console.log(response);
    } else {
      const response = checkDuplicateEmail(formData.email);
      console.log(response);
    }
  };

  // api : 회원가입 버튼 클릭 시 폼 제출
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log("name :", name);
    console.log("value : ", value);
    if (e.target.value) {
      console.log(e.target.value);
    }
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
                          autoFocus
                          data-fieldName="이름"
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
