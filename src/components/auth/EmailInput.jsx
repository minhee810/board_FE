import React, { forwardRef, memo } from "react";
import InputField from "../common/input/InputField";

const EmailInput = forwardRef(({ value, onChange, onBlur }, ref) => {
  const handleChange = (event) => {
    console.log("email input Change value");
    onChange(event);
  };
  return (
    <InputField
      data-name="이메일"
      data-check={true}
      name="email"
      className="form-control form-control-user"
      value={value}
      onBlur={onBlur}
      onChange={handleChange}
      placeholder="이메일 주소"
      ref={ref}
    />
  );
});

export default memo(EmailInput);
