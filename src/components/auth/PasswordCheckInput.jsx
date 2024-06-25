import React, { useEffect, useRef, useState } from "react";
import { isMatch } from "../../utils/utility"; // 이 함수가 비밀번호 일치를 확인하는 함수라고 가정합니다.
import { regTest } from "../../utils/validation";
import { hintMsg } from "../../utils/message";

const PasswordCheck = ({
  showAlert,
  onDataChange,
  onPasswordMatch,
  onPasswordValid,
}) => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordValid, setPasswordValid] = useState(false); // 유효성 검사 결과

  useEffect(() => {
    // 비밀번호와 비밀번호 확인 값이 변경될 때마다 일치 여부를 검사
    const isMatch = password === passwordConfirm;
    onPasswordMatch(isMatch);
    onPasswordValid(passwordValid);
  }, [
    password,
    passwordConfirm,
    onPasswordMatch,
    passwordValid,
    onPasswordValid,
  ]);

  // const showAlert = (message) => {
  //   if (!isAlertVisible) {
  //     setIsAlertVisible(true);
  //     alert(message);
  //     setTimeout(() => setIsAlertVisible(false), 100);
  //   }
  // };

  const handleRegTest = (e) => {
    const { name, value } = e.target;

    if (!regTest(name, value)) {
      setPasswordValid(false);
      showAlert(hintMsg.password);
      return false;
    }
    if (!passwordValid) {
      showAlert("사용가능한 비밀번호입니다.");
      setPasswordValid(true);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordValid(false);
  };

  const handlePasswordConfirmChange = (e) => {
    const newPasswordConfirm = e.target.value;
    setPasswordConfirm(newPasswordConfirm);
  };

  const handleCheck = (e) => {
    console.log("handleCheck()");
    if (password && passwordConfirm) {
      let isMatchs = isMatch(password, passwordConfirm);
      if (isMatchs) {
        // 일치하는지 아닌지 true / false
        onDataChange(password, isMatchs, false); // 비밀번호가 일치할 때
      } else {
        onDataChange(password, isMatchs, false); // 비밀번호가 일치하지 않을 때
      }
    }
  };

  return (
    <div>
      <div className="form-group row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <input
            ref={passwordRef}
            data-name="비밀번호"
            value={password || ""}
            type="password"
            name="password"
            onBlur={(e) => handleRegTest(e)}
            onChange={handlePasswordChange}
            autoComplete="off"
            className="form-control form-control-user"
            placeholder="비밀번호"
          />
        </div>
        <div className="col-sm-6">
          <input
            ref={passwordConfirmRef}
            data-name="비밀번호 확인"
            value={passwordConfirm || ""}
            type="password"
            name="passwordConfirm"
            onBlur={handleCheck}
            onChange={handlePasswordConfirmChange}
            autoComplete="off"
            className="form-control form-control-user"
            placeholder="비밀번호 확인"
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordCheck;
