import api from "../../utils/api";

// 게시글 목록 조회
export async function boardList(page) {
  try {
    const response = await api.get(`/board/?page=${page}`);
    return response.data;
  } catch (error) {
    console.log(" service error : ", error);
  }
}

export async function getJasperReportList(format) {
  try {
    const response = await api.get(`/api/reports/item-report/${format}`);
    return response.data;
  } catch (error) {
    console.log("service error : ", error);
  }
}
