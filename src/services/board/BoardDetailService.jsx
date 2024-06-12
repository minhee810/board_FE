import axios from "axios";
import api from "../../utils/api";

export const downloadFile = async (boardId, orgFileName, saveFileName) => {
  try {
    // 서버에 파일 다운로드 요청
    const response = await api.get(
      `/api/fileDownload/${boardId}/${saveFileName}/${orgFileName}`,
      {
        responseType: "blob", // blob 타입으로 응답받기
      }
    );
    // 응답으로 받은 데이터를 Blob 객체로 변환
    const url = window.URL.createObjectURL(new Blob([response.data]));
    // console.log("url", url);
    // 링크 요소를 생성하여 다운로드를 트리거
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", orgFileName); // 다운로드 파일 이름 설정
    document.body.appendChild(link);
    link.click();

    // 링크 요소 제거
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("파일 다운로드 중 오류가 발생했습니다.", error);
  }
};

// 게시글 상세보기 조회
export async function boardDetail(boardId) {
  try {
    const response = await api.get(`/detail/` + boardId);
    console.log("response : ", response);
    return response;
  } catch (error) {
    console.log("service error : ", error);
  }
}

export async function boardUpdate(boardId, formData) {
  console.log(boardId, formData);
  try {
    console.log("service 왓니? ");
    const response = await axios.post(`/api/modify/${boardId}`, formData);
    console.log("service response : ", response);
    return response;
  } catch (error) {
    console.log("service error : ", error);
  }
}
