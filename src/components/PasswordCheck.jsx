import React, { useEffect, useRef, useState } from "react";
import { isMatch } from "../utils/utility"; // 이 함수가 비밀번호 일치를 확인하는 함수라고 가정합니다.
import { regExpFields, regTest } from "../utils/validation";
import { hintMsg, showMessage } from "../utils/message";

const PasswordCheck = ({ onDataChange, onPasswordMatch }) => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [pwCheckStatus, setCheckStatus] = useState(false);

  useEffect(() => {
    // 비밀번호와 비밀번호 확인 값이 변경될 때마다 일치 여부를 검사
    const isMatch = password === passwordConfirm;
    console.log("비밀번호가 일치합니까? useEffect : ", isMatch);
    onPasswordMatch(isMatch);
  }, [password, passwordConfirm, onPasswordMatch]);

  const showAlert = (message) => {
    if (!isAlertVisible) {
      setIsAlertVisible(true);
      alert(message);
      setTimeout(() => setIsAlertVisible(false), 100); // 100ms 후에 상태를 변경하여 다시 알림을 표시할 수 있도록 함
    }
  };

  const handleRegTest = (e) => {
    const { name, value } = e.target;
    if (!regTest(name, value)) {
      showAlert(hintMsg.password);
      setCheckStatus(false);
      return false;
    }

    // 비밀번호 입력란의 데이터를 변경했을 경우, 비밀번호 비교를 다시 진행해야한다.
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setCheckStatus(false);
  };

  const handlePasswordConfirmChange = (e) => {
    const newPasswordConfirm = e.target.value;
    setPasswordConfirm(newPasswordConfirm);
    let result = isMatch(password, passwordConfirm);
    if (result) {
      setCheckStatus(true);
    }
  };

  // 바꾸기 전에
  // useEffect(() => {
  //   if (password) {
  //     onDataChange(password, pwCheckStatus);
  //   }
  // }, [pwCheckStatus, password, onDataChange]);

  const handleCheck = (e) => {
    if (password && passwordConfirm) {
      let result = isMatch(password, passwordConfirm);
      console.log("password 비교 결과 : ", result);
      if (result) {
        // showAlert("비밀번호가 일치합니다.");
        setCheckStatus(true);
        onDataChange(password, true, true); // 비밀번호가 일치할 때
      } else {
        setCheckStatus(false);
        // showAlert("비밀번호가 일치하지 않습니다.");
        onDataChange(null, false, true); // 비밀번호가 일치하지 않을 때
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
