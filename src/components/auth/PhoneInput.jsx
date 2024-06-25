import React, { useState } from "react";
import InputField from "../common/input/InputField";
import { REPLACE_VALID, regTest } from "../../utils/validation";
import { phoneFormat } from "../../utils/utility";

const PhoneInput = ({ showAlert, value, onChange, onBlur }) => {
  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    const filteredValue = value.replace(REPLACE_VALID[name], "");
    setPhone(filteredValue);
    onChange(event); // 해야할까?
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    if (!regTest(name, value)) {
      if (isBlank) {
        showAlert("휴대폰 번호를 입력해주세요");
        return false;
      }
    } else {
      if (!isPhoneValid) {
        showAlert("사용 가능한 휴대전화 번호입니다.");
        setIsPhoneValid(true);
      }
    }
    const val = phoneFormat(event.target.value);
    setPhone(val);

    if (onBlur) {
      onBlur(event);
    }
  };

  const isBlank = phone.trim() === "";
  return (
    <>
      <InputField
        data-name="휴대전화 번호"
        data-check={true}
        name="phone"
        type="phone"
        className="form-control form-control-user"
        value={phone}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="휴대폰 번호"
        // ref={ref}
      />
    </>
  );
};

export default PhoneInput;
