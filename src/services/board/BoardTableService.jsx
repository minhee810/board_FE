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
