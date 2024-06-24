import React from "react";

export const InputField = ({
  name,
  type = "text",
  className,
  maxLength,
  value,
  onChange,
  onBlur,
  placeholder,
  ...rest
}) => {
  return (
    <>
      <input
        name={name}
        type={type}
        className="form-control form-control-user"
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        {...rest}
      />
    </>
  );
};
