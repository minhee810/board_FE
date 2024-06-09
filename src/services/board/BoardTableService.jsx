import api from "../../utils/api";

// 게시글 목록 조회
export async function boardList() {
  try {
    const response = await api.get(`api/`);
    return response.data;
  } catch (error) {
    console.log(" service error : ", error);
  }
}
