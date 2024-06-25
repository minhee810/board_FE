import React, { useCallback, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostCode from "../../services/PostCode";
import api from "../../utils/api";
import PasswordCheck from "../../components/auth/PasswordCheckInput";
import { REPLACE_VALID, regTest } from "../../utils/validation";
import {
  checkDuplicateEmail,
  checkDuplicateUsername,
} from "../../services/auth/JoinService";
import { hintMsg } from "../../utils/message";
import { phoneFormat } from "../../utils/utility";
import EmailInput from "../../components/auth/EmailInput";
import UsernameInput from "../../components/auth/UsernameInput";

export const JoinForm = () => {
  const navigate = useNavigate();
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const [pwCheckStatus, setPwCheckStatus] = useState(false);
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
  const [validText, setValidText] = useState("");

  let isAlertVisible = useRef(false);

  const showAlert = (message) => {
    if (!isAlertVisible.current) {
      isAlertVisible.current = true;
      alert(message);
      console.log("message console");
      setTimeout(() => {
        isAlertVisible.current = false;
      }, 100); // 100ms 후에 상태를 변경하여 다시 알림을 표시할 수 있도록 함
    }
  };
  const handlePasswordMatch = (isMatch) => {
    setIsMatch(isMatch);
  };

  // input 창 상태 관리 + replace 함수 호출
  const handleInputChange = useCallback(
    (event) => {
      let { name, value, dataset } = event.target;
      // if (dataset.check) {
      //   const filteredValue = value.replace(REPLACE_VALID[name], "");
      //   setFormData((prevData) => ({ ...prevData, [name]: filteredValue }));
      // } else {
      // setFormData((prevData) => ({ ...prevData, [name]: value }));
      // }
      if (name === "email") setIsEmailValid(false); // 이메일이 변경되면 유효성 검사를 초기화
      if (name === "username") setIsUsernameValid(false); // userbane 변경되면 유효성 검사를 초기화
      if (name === "password") setIsPasswordValid(false); // password 변경되면 유효성 검사를 초기화
    },
    [setFormData, setIsEmailValid, setIsUsernameValid, setIsPasswordValid]
  );

  const handlePasswordChange = (password, isMatchs) => {
    console.log("제출된 password : ", password);
    console.log("일치하는가 ? ", isMatchs);
    setIsMatch(isMatchs);
    console.log("isAlertVisible :", isAlertVisible.current);

    if (isMatchs) {
      if (!isAlertVisible.current) {
        console.log("비밀번호가 일치");
        showAlert("비밀번호가 서로 일치합니다.");
      }
    } else {
      if (!isAlertVisible.current) {
        console.log("비밀번호가 일치하지 않음.");
        showAlert("비밀번호가 서로 일치하지 않습니다.");
        setIsMatch(false);
      }
    }
    setFormData({ ...formData, password: password });
  };

  // api :  사용자 이름 & 이메일 중복 확인
  const checkDuplicate = useCallback(
    async (e, data) => {
      e.preventDefault();
      const { name, value, dataset } = e.target;
      let fieldName = dataset.email;
      const emailValue = emailRef.current.value;

      if (name === "username") {
        // if (!regTest(name, value)) {
        //   setValidText(hintMsg.username);
        //   return false;
        // }
        const response = await checkDuplicateUsername(data);
        if (response.code === 2) {
          setValidText(response.msg);
          setIsUsernameValid(true);
        }
        if (response.error) {
          setValidText(response.msg);
        }
      }

      if (fieldName === "email") {
        if (!emailValue.trim()) {
          alert("이메일을 입력해주세요");
          return false;
        }
        if (!regTest(fieldName, emailValue)) {
          alert(hintMsg.email);
          return false;
        }
        const response = await checkDuplicateEmail(formData.email);
        if (response.code === 1) {
          setIsEmailValid(true);
        }
        if (response.error) {
          alert(response.msg);
        }
      }
    },
    [formData]
  );

  const hadleFmt = (e) => {
    const { name, value } = e.target;

    if (!regTest(name, value)) {
      if (formData.phone !== "") {
        showAlert(hintMsg.phone);
      }

      return false;
    } else {
      if (!isPhoneValid) {
        showAlert("사용 가능한 휴대전화 번호입니다.");
        setIsPhoneValid(true);
      }
    }
    const val = phoneFormat(e.target.value);
    setFormData({ ...formData, phone: val });
  };

  // // api : 회원가입 버튼 클릭 시 폼 제출
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    for (let key in formData) {
      let field = "";
      if (formData[key].trim() === "") {
        switch (key) {
          case "username":
            field = "이름";
            break;
          case "email":
            field = "이메일";
            break;
          case "password":
            field = "비밀번호";
            break;
          case "address":
            field = "주소";
            break;
          case "detailAddress":
            field = "상세주소";
            break;
          case "note":
            field = "참고사항";
            break;
          default:
            field = "빈 칸";
        }
        alert(`${field}을(를) 입력해주세요.`);
        return false;
      }
    }

    if (!isEmailValid) {
      showAlert("이메일 중복 검사를 진행해주세요");
      return false;
    }
    if (!isPhoneValid) {
      showAlert("휴대전화 번호 형식이 올바르지 않습니다.");
      return false;
    }
    if (!isPasswordValid) {
      showAlert("비밀번호가 일치하지 않습니다.");
      return false;
    }
    if (!isUsernameValid) {
      showAlert("사용자 이름이 유효하지 않습니다.");
      return false;
    }

    if (!regTest("password", formData.password)) {
      showAlert(hintMsg.password);
      return false;
    }
    if (window.confirm("회원가입을 진행하시겠습니까? ")) {
      try {
        await api.post(`/join`, formData);
        navigate("/login");
      } catch (error) {
        console.log("response.status :", error.response.status);
      }
    }
  };
  const handlePasswordValid = (passwordValid) => {
    setIsPasswordValid(passwordValid);
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
                        <UsernameInput
                          value={formData.username}
                          onChange={handleInputChange}
                          onBlur={checkDuplicate}
                          ref={usernameRef}
                        />
                        {validText && usernameRef.current.value && (
                          <p
                            style={{
                              color: "black",
                              fontSize: "12px",
                            }}
                          >
                            {validText}
                          </p>
                        )}
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-9 mb-3 mb-sm-0">
                          <EmailInput
                            ref={emailRef}
                            value={formData.email}
                            onChange={handleInputChange}
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
                        pwCheckStatus={pwCheckStatus}
                        onPasswordValid={handlePasswordValid}
                        onPasswordMatch={handlePasswordMatch}
                      />
                      <div className="form-group">
                        <input
                          data-name="휴대전화 번호"
                          data-check={true}
                          type="phone"
                          name="phone"
                          onChange={(e) => handleInputChange(e)}
                          onBlur={(e) => hadleFmt(e)}
                          className="form-control form-control-user"
                          placeholder="휴대폰번호"
                          ref={phoneRef}
                          value={formData.phone || ""}
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
                          data-check={false}
                          data-name="상세주소"
                          type="text"
                          name="detailAddress"
                          onChange={(e) => handleInputChange(e)}
                          className="form-control form-control-user"
                          placeholder="상세주소"
                          value={formData.detailAddress || ""}
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
