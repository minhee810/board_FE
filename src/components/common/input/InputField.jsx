import React, { forwardRef, memo } from "react";

const InputField = forwardRef(
  (
    {
      name,
      type = "text",
      className,
      maxLength,
      value,
      onChange,
      onBlur,
      placeholder,
      ...rest
    },
    ref
  ) => {
    return (
      <>
        <input
          ref={ref}
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
  }
);

export default memo(InputField);
