import React from "react";
import { CustomButton } from "./CustomButton";
import { getJasperReportList } from "../../../services/board/BoardTableService";

const JasperListButton = () => {
  const handleJasperReport = async () => {
    let format = "pdf";

    const response = await getJasperReportList(format);
    console.log("jasper report click : " + response);
  };

  return (
    <>
      <CustomButton className="float-left" onClick={handleJasperReport}>
        use Jasper Report
      </CustomButton>
    </>
  );
};

export default JasperListButton;
