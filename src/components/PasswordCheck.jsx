import React, { useRef, useState } from "react";
import { isMatch } from "../utils/utility";
import { regExpFields } from "../utils/validation";

const PasswordCheck = ({ onDataChange }) => {
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const [password, setPassword] = useState("");
  let pwCheckStatus = false;

  // 비밀번호 일치 검사
  const handlePasswordInput = (e) => {
    console.log("handlePasswordInput() 호출");
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    if (password && passwordConfirm && !isMatch(password, passwordConfirm)) {
      alert("비밀번호가 일치하지 않습니다.");
      pwCheckStatus = false;
      return false;
    }
    if (password && passwordConfirm && isMatch(password, passwordConfirm)) {
      alert("비밀번호가 일치합니다.");
      console.log("handleInputChange() 호출");
      pwCheckStatus = true;
      if (pwCheckStatus) {
        setPassword(password);
        // 비밀번호 일치 확인 후 부모 컴포넌트로 password값과 함께 함수 호출하기
        onDataChange(password);
      }
    }
  };

  // const handleRegTest = (event) => {
  //   console.log("handleRegTest() 호출");
  //   console.log(passwordRef.current.value);
  //   console.log("event : ", event.target.name);
  //   let name = event.target.name;
  //   if (!regExpFields(event)) {
  //     createMessage(event);
  //   }
  // };

  return (
    <div>
      <div className="form-group row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <input
            ref={passwordRef}
            type="password"
            name="password"
            // onBlur={handleRegTest}
            onChange={handlePasswordInput}
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
