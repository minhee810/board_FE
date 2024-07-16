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

// export async function getJasperReportList(format) {
//   try {
//     const response = await api.get(`/api/reports/item-report/${format}`, {
//       responseType: "blob",
//     });

//     const url = window.URL.createObjectURL(new Blob([response.data]));

//     console.log("url ? : ", url);
//     const link = document.createElement("a");

//     link.href = url;
//     link.setAttribute("download", format);
//     link.click();

//     link.parentNode.removeChild(link);
//     window.URL.revokeObjectURL(url);

//     console.log("여기까지 오니? ");

//     console.log("response 성공");
//     return response.data;
//   } catch (error) {
//     console.log("service error : ", error);
//   }
// }
