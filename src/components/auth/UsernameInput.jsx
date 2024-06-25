import React, { forwardRef, memo, useState } from "react";
import InputField from "../common/input/InputField";
import { REPLACE_VALID, regTest } from "../../utils/validation";
import { hintMsg } from "../../utils/message";

const UsernameInput = forwardRef(({ value, onChange, onBlur }, ref) => {
  const [username, setUsername] = useState("");
  const [validText, setValidText] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    const filteredValue = value.replace(REPLACE_VALID[name], "");
    setUsername(filteredValue);
    onChange(event);
  };

  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event, username);
    }
  };

  return (
    <>
      <InputField
        data-name="사용자 이름"
        data-check={true}
        name="username"
        className="form-control form-control-user"
        value={username}
        maxLength={10}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="이름"
        ref={ref}
      />
    </>
  );
});

export default memo(UsernameInput);
