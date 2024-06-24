import React from "react";
import { CustomButton } from "./CustomButton";

export const DuplicateButton = ({ name, email, onClick }) => {
  return (
    <div>
      <CustomButton className="btn-user btn-block" onClick={onClick}>
        중복확인
      </CustomButton>
    </div>
  );
};
