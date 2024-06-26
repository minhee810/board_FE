import React, { useState } from "react";
import InputField from "../common/input/InputField";
import { REPLACE_VALID, regTest } from "../../utils/validation";
import { phoneFormat } from "../../utils/utility";
import { hintMsg } from "../../utils/message";

const PhoneInput = ({
  showAlert,
  value,
  onChange,
  onBlur,
  setIsPhoneValid,
}) => {
  const [phone, setPhone] = useState("");

  const handleChange = (event) => {
    setIsPhoneValid(false);
    const { name, value } = event.target;
    const filteredValue = value.replace(REPLACE_VALID[name], "");
    setPhone(filteredValue);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (isBlank) {
      showAlert("휴대폰 번호를 입력해주세요");
      return false;
    }
    if (!regTest(name, value)) {
      showAlert(hintMsg.phone);
      return false;
    } else {
      // if (!isPhoneValid) {
      showAlert("사용 가능한 휴대전화 번호입니다.");
      setIsPhoneValid(true);
      // }
    }
    const val = phoneFormat(event.target.value);
    setPhone(val);

    if (onBlur) {
      console.log("phone : ", phone);
      onBlur(event, phone);
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
        // valid={isPhoneValid}
        placeholder="휴대폰 번호"
      />
    </>
  );
};

export default PhoneInput;
