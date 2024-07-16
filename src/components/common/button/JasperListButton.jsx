import React from "react";
import { CustomButton } from "./CustomButton";
import axios from "axios";

const JasperListButton = () => {
  const downloadPDF = async () => {
    try {
      const response = await axios({
        url: "/api/reports/item-report/pdf", // 실제 엔드포인트
        method: "GET",
        responseType: "blob", // 응답을 Blob으로 설정
      });

      // Blob을 URL로 변환하고 다운로드 링크 생성
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "boardList.pdf"); // 다운로드 파일 이름 설정
      document.body.appendChild(link);
      link.click();

      // 링크를 제거
      document.body.removeChild(link);
    } catch (error) {
      console.error("PDF 다운로드 중 오류 발생:", error);
    }
  };

  return (
    <>
      <CustomButton className="float-left" onClick={downloadPDF}>
        use Jasper Report
      </CustomButton>
    </>
  );
};

export default JasperListButton;
