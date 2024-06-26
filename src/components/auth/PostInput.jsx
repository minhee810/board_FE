import React, { forwardRef, memo, useState } from "react";
import PostCode from "../../services/PostCode";
import InputField from "../common/input/InputField";

const PostInput = forwardRef(({ value, onChange, onBlur }, ref) => {
  const [formData, setFormData] = useState({
    address: "",
    detailAddress: "",
    zipCode: "",
    note: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    console.log("postInput data : ", formData);
    if (onBlur) {
      onBlur(event, formData);
    }
  };

  return (
    <>
      <div className="form-group row">
        <div className="col-sm-9 mb-3 mb-sm-0">
          <InputField
            data-name="주소"
            type="text"
            name="address"
            onChange={handleInputChange}
            onBlur={handleBlur}
            value={formData.address}
            className="form-control form-control-user"
            placeholder="주소"
            readOnly
          />
        </div>
        <div className="col-sm-3">
          <PostCode setSignForms={setFormData} />
        </div>
      </div>
      <div className="form-group">
        <InputField
          data-check={false}
          data-name="상세주소"
          type="text"
          name="detailAddress"
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="form-control form-control-user"
          placeholder="상세주소"
          value={formData.detailAddress}
        />
      </div>
      <div className="form-group row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <InputField
            data-name="우편번호"
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="form-control form-control-user"
            placeholder="우편번호"
            readOnly
          />
        </div>
        <div className="col-sm-6">
          <InputField
            data-name="참고사항"
            type="note"
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="form-control form-control-user"
            placeholder="참고사항"
          />
        </div>
      </div>
    </>
  );
});

export default memo(PostInput);
