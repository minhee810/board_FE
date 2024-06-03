import React, { useRef } from "react";
import { isMatch } from "../utils/utility";
import { regExpFields, validator } from "../utils/validation";
const PasswordCheck = () => {
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  // 비밀번호 일치 검사
  const handlePasswordInput = () => {
    console.log("handlePasswordInput() 호출");
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    let pwCheckStatus = false;

    if (password && passwordConfirm && !isMatch(password, passwordConfirm)) {
      alert("비밀번호가 일치하지 않습니다.");
      pwCheckStatus = false;
      return false;
    }
    if (password && passwordConfirm && isMatch(password, passwordConfirm)) {
      alert("비밀번호가 일치합니다.");
      pwCheckStatus = true;
    }
  };

  const handleRegTest = (event) => {
    console.log("handleRegTest() 호출");
    console.log(passwordRef.current.value);
    if (!regExpFields(event)) {
      alert("비밀번호 유효성 검사 실패");
    }
  };

  return (
    <div>
      <div className="form-group row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <input
            ref={passwordRef}
            type="password"
            name="password"
            onBlur={(event) => handleRegTest}
            autoComplete="off"
            className="form-control form-control-user"
            placeholder="비밀번호"
          />
        </div>
        <div className="col-sm-6">
          <input
            ref={passwordConfirmRef}
            type="password"
            name="passwordConfirm"
            onBlur={handlePasswordInput}
            className="form-control form-control-user"
            autoComplete="off"
            placeholder="비밀번호 확인"
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordCheck;
