import React, { useRef, useState } from "react";
import { isMatch } from "../utils/utility";
import { regExpFields, regTest } from "../utils/validation";
import { hintMsg } from "../utils/message";

const PasswordCheck = ({ onDataChange, isAlertShown }) => {
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  let pwCheckStatus = false;

  // 비밀번호 일치 검사
  const handlePasswordInput = (e) => {
    console.log("handlePasswordInput() 호출");
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    if (password && passwordConfirm && !isMatch(password, passwordConfirm)) {
      setSuccessMessage("");
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      pwCheckStatus = false;
      return false;
    }
    if (password && passwordConfirm && isMatch(password, passwordConfirm)) {
      setErrorMessage("");
      setSuccessMessage("비밀번호가 일치합니다.");
      console.log("handleInputChange() 호출");
      pwCheckStatus = true;
      if (pwCheckStatus) {
        setPassword(password);
        // 비밀번호 일치 확인 후 부모 컴포넌트로 password값과 함께 함수 호출하기
        onDataChange(password);
      }
    }
  };

  const handleRegTest = (e) => {
    const { name, value } = e.target;
    console.log("value : ", value);
    if (!regTest(name, value)) {
      setErrorMessage(hintMsg.password);
      return false;
    }
  };

  return (
    <div>
      <div className="form-group row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <input
            data-name="비밀번호"
            ref={passwordRef}
            type="password"
            name="password"
            onBlur={(e) => handleRegTest(e)}
            onChange={(e) => handlePasswordInput(e)}
            autoComplete="off"
            className="form-control form-control-user"
            placeholder="비밀번호"
          />
        </div>
        <div className="col-sm-6">
          <input
            data-name="비밀번호 확인"
            ref={passwordConfirmRef}
            type="password"
            name="passwordConfirm"
            onBlur={(e) => handleRegTest(e)}
            onChange={(e) => handlePasswordInput(e)}
            // onBlur={handleRegTest}
            className="form-control form-control-user"
            autoComplete="off"
            placeholder="비밀번호 확인"
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
    </div>
  );
};

export default PasswordCheck;
