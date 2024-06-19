import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostCode from "../../services/PostCode";
import api from "../../utils/api";
import PasswordCheck from "../../components/PasswordCheck";
import {
  JOIN_VALID,
  REPLACE_VALID,
  regExpFields,
  regTest,
} from "../../utils/validation";
import {
  checkDuplicateEmail,
  checkDuplicateUsername,
} from "../../services/auth/JoinService";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { hintMsg } from "../../utils/message";
import { Alert } from "react-bootstrap";

export const JoinForm = () => {
  const navigate = useNavigate();
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  const [isAlertShown, setIsAlertShown] = useState(false);

  // input 창 상태 관리 + replace 함수 호출
  const handleInputChange = (event) => {
    let { name, value, dataset } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(name + "을 체크합니다.");
    console.log("dataset.check : ", dataset.check);
    if (dataset.check) {
      replaceChar(event);
    }
    // 공백 검사는 blur 에서 처리
  };

  // 글자 재배치
  const replaceChar = (event) => {
    let { name, value } = event.target;
    if (name) {
      const filteredValue = value.replace(REPLACE_VALID[name], "");
      setFormData({ ...formData, [name]: filteredValue });
    } else {
      setFormData({ ...formData, [name]: value });
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
    // let name = event.target.name;
    const { name, value, dataset } = e.target;
    let fieldName = dataset.email;
    const emailValue = emailRef.current.value;

    if (name === "username") {
      if (!regTest(name, value)) {
        alert(hintMsg.username);
        return false;
      }
      checkDuplicateUsername(formData.username);
    }
    if (fieldName === "email") {
      if (!emailValue.trim()) {
        alert("이메일을 입력해주세요");
        return false;
      }
      if (!regTest(fieldName, emailValue)) {
        alert(hintMsg.email);
        console.log("이메일 유효성 검사 실패");
        return false;
      }
      console.log("이메일 유효성 검사 성공입니다.");
      checkDuplicateEmail(formData.email);
    }
  };

  const handleSpaceCheck = (e) => {
    console.log("공백체크 알림입니다 .");
    const { name, value, dataset } = e.target;
    if (!value.trim()) {
      alert(dataset.name + "을 입력해주세요.");
      return false;
    }
    return true;
  };
  // api : 회원가입 버튼 클릭 시 폼 제출
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, value, dataSet } = e.target;

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
                          data-name="사용자 이름"
                          data-check={true}
                          type="text"
                          name="username"
                          maxLength={10}
                          // onKeyUp={handleInputChange}
                          onChange={(e) => handleInputChange(e)}
                          onBlur={checkDuplicate}
                          className="form-control form-control-user"
                          placeholder="이름"
                          ref={usernameRef}
                          value={formData.username}
                        />
                      </div>
                      {errorMessage && (
                        <p style={{ color: "red" }}>{errorMessage}</p>
                      )}
                      <div className="form-group row">
                        <div className="col-sm-9 mb-3 mb-sm-0">
                          <input
                            data-name="이메일"
                            data-check={true}
                            type="email"
                            name="email"
                            onChange={(e) => handleInputChange(e)}
                            className="form-control form-control-user"
                            placeholder="이메일주소"
                            ref={emailRef}
                            value={formData.email}
                          />
                        </div>
                        <div className="col-sm-3">
                          <button
                            data-email="email"
                            name="emailCheck"
                            onClick={checkDuplicate}
                            className="btn btn-primary btn-user btn-block"
                          >
                            중복확인
                          </button>
                        </div>
                      </div>
                      {/* password checker component */}
                      <PasswordCheck
                        onDataChange={handlePasswordChange}
                        isAlertShown={isAlertShown}
                      />
                      <div className="form-group">
                        <input
                          data-name="휴대전화 번호"
                          data-check={true}
                          type="phone"
                          name="phone"
                          onChange={(e) => handleInputChange(e)}
                          className="form-control form-control-user"
                          placeholder="휴대폰번호"
                          ref={phoneRef}
                          value={formData.phone}
                        />
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-9 mb-3 mb-sm-0">
                          <input
                            data-name="주소"
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
                          data-name="상세주소"
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
                            data-name="우편번호"
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
                            data-name="참고사항"
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
