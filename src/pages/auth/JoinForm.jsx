import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostCode from "../../services/PostCode";
import api from "../../utils/api";
import PasswordCheck from "../../components/PasswordCheck";
import { REPLACE_VALID, regTest } from "../../utils/validation";
import {
  checkDuplicateEmail,
  checkDuplicateUsername,
} from "../../services/auth/JoinService";
import { hintMsg } from "../../utils/message";
import { phoneFormat } from "../../utils/utility";

export const JoinForm = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);
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
  const [validText, setValidText] = useState("");
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
    if (dataset.check) {
      if (name) {
        const filteredValue = value.replace(REPLACE_VALID[name], "");
        setFormData({ ...formData, [name]: filteredValue });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
    if (name === "email") {
      setIsEmailValid(false); // 이메일이 변경되면 유효성 검사를 초기화
    }

    if (name === "username") {
      setIsUsernameValid(false); // 이메일이 변경되면 유효성 검사를 초기화
    }

    if (name === "password") {
      setIsPwValid(false); // 이메일이 변경되면 유효성 검사를 초기화
    }
  };

  // 비밀번호 자식 컴포넌트에서 가져온 값 저장
  const handlePasswordChange = (password) => {
    console.log("handlePasswordChange() 호출");

    // setIsPwValid(pwCheckStatus);
    setFormData({ ...formData, password: password });
  };

  // api :  사용자 이름 & 이메일 중복 확인
  const checkDuplicate = async (e) => {
    console.log("checkDuplicate() 호출");
    e.preventDefault();
    const { name, value, dataset } = e.target;
    let fieldName = dataset.email;
    const emailValue = emailRef.current.value;

    if (name === "username") {
      if (!regTest(name, value)) {
        setValidText(hintMsg.username);
        return false;
      }
      const response = await checkDuplicateUsername(formData.username);
      if (response.code === 2) {
        setValidText(response.msg);
        setIsEmailValid(true);
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
        console.log("이메일 유효성 검사 실패");
        return false;
      }
      const response = await checkDuplicateEmail(formData.email);
      console.log("이메일 중복 확인 : ", response);
      if (response.code === 1) {
        console.log("이메일 중복확인 성공");
        setIsEmailValid(true);
      }
      if (response.error) {
        alert(response.msg);
      }
    }
  };

  const hadleFmt = (e) => {
    const val = phoneFormat(e.target.value);
    setFormData({ ...formData, phone: val });
  };

  // // api : 회원가입 버튼 클릭 시 폼 제출
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    /**
     * 회원가입 버튼 클릭 시
     * 1. 모든 필드가 널값이 아닌지 확인
     * 2. 중복 검사가 모두 실시되었는지 확인
     * 3. 서버로 데이터 전송
     */
    for (let key in formData) {
      let field = "";
      if (formData[key].trim() === "") {
        console.log("key : ", key);
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
    if (formData.username === "") {
      alert("사용자 이름을 작성해주세요.");
      return false;
    }
    if (formData.email === "") {
      alert("이메일을 작성해주세요");
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
                          value={formData.username || ""}
                        />
                        {validText && formData.username && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "12px",
                            }}
                          >
                            {validText}
                          </p>
                        )}
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-9 mb-3 mb-sm-0">
                          <input
                            data-name="이메일"
                            data-check={true}
                            type="text"
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
                      <PasswordCheck onDataChange={handlePasswordChange} />
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
                          data-check={false}
                          data-name="상세주소"
                          type="text"
                          name="detailAddress"
                          onChange={(e) => handleInputChange(e)}
                          className="form-control form-control-user"
                          placeholder="상세주소"
                          value={formData.detailAddress}
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
