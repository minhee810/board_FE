import React from "react";
import { InputField } from "../common/input/InputField";

export const UsernameInput = React.memo(({ value, onChange, onBlur }) => {
  const handleChange = (event) => {
    console.log("username input chanege value");
    onChange(event);
  };
  return (
    <InputField
      data-name="사용자 이름"
      data-check={true}
      name="username"
      className="form-control form-control-user"
      value={value}
      maxLength={10}
      onBlur={onBlur}
      onChange={handleChange}
      placeholder="이름"
    />
  );
});
