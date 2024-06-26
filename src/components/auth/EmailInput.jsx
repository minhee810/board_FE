import React, { forwardRef, memo, useRef, useState } from "react";
import InputField from "../common/input/InputField";
import { REPLACE_VALID, regTest } from "../../utils/validation";
import { hintMsg } from "../../utils/message";

const EmailInput = forwardRef(
  ({ value, onChange, onBlur, onClick, setIsEmailValid }, ref) => {
    const [email, setEmail] = useState("");

    const handleChange = (event) => {
      setIsEmailValid(false);
      const { name, value } = event.target;
      const filteredValue = value.replace(REPLACE_VALID[name], "");
      setEmail(filteredValue);
      // onChange(event);
    };

    const hadleClick = (event) => {
      const { dataset } = event.target;

      if (isBlank) {
        alert("이메일을 입력해주세요.");
        return false;
      }
      if (!regTest(dataset.email, ref.current.value)) {
        alert(hintMsg.email);
        return false;
      }
      setIsEmailValid(true);
      if (onClick) {
        onClick(event, email);
      }
    };

    const isBlank = email.trim() === "";

    return (
      <>
        <div className="col-sm-9 mb-3 mb-sm-0">
          <InputField
            data-name="이메일"
            data-check={true}
            name="email"
            className="form-control form-control-user"
            value={email}
            onChange={handleChange}
            placeholder="이메일 주소"
            ref={ref}
          />
        </div>
        <div className="col-sm-3">
          <button
            type="button"
            data-email="email"
            name="emailCheck"
            onClick={hadleClick}
            className="btn btn-primary btn-user btn-block"
          >
            중복확인
          </button>
        </div>
      </>
    );
  }
);

export default memo(EmailInput);
