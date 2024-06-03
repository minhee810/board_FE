import React, { useCallback, useState } from "react";

const PasswordCheck = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <div>
      <div className="form-group row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <input
            type="password"
            name="password"
            // onChange={handlePasswordInput}
            autoComplete="off"
            className="form-control form-control-user"
            placeholder="비밀번호"
          />
        </div>
        <div className="col-sm-6">
          <input
            type="password"
            name="passwordConfirm"
            // onChange={handlePasswordInput}
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
