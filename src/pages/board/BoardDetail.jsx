import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentList from "../../components/CommentList";
import CommentWrite from "../../components/CommentWrite";
import "../../assets/styles/board/board-detail.css";
import { boardDetail } from "../../services/board/BoardTableService";
import axios from "axios";
import api from "../../utils/api";

const BoardDetail = () => {
  const { boardId } = useParams(); // 동적 라우팅, 클릭한 컴포넌트의 id값 받아옴
  const [data, setData] = useState([]);
  const [files, setFiles] = useState([]);

  async function getBoardDetail(boardId) {
    try {
      const response = await boardDetail(boardId);
      setData(response.data.data.detail);
      setFiles(response.data.data.files);
    } catch (error) {
      console.log("error :", error);
    }
  }

  // async function downloadFile(orgFileName, saveFileName) {
  //   const fileUrl = `/api/fileDownload/${boardId}/${saveFileName}/${orgFileName}`;
  //   const serverUrl = process.env.REACT_APP_SERVER_URL;
  //   try {
  //     const response = await api.get(fileUrl, { responseType: "blob" });
  //     const url = console.log(url);
  //     // console.log(response.data);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     // a.download = response.da
  //     document.body.appendChild(a);
  //     a.click();
  //     // window.URL.revokeObjectURL(url);
  //     document.body.removeChild(a);
  //   } catch (error) {
  //     console.log("error : ", error);
  //   }
  // }
  // const downloadFile = async (orgFileName, saveFileName) => {
  //   const serverUrl = process.env.REACT_APP_SERVER_URL;
  //   const fileUrl = process.env.REACT_APP_FILE_SAVE_URL;
  //   try {
  //     const response = await api.get(
  //       `/fileDownload/${boardId}/${saveFileName}/${orgFileName}`,
  //       { responseType: "blob" }
  //     );
  //     const url = `/fileDownload/${boardId}/${saveFileName}/${orgFileName}`;
  //     console.log(url);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = orgFileName; // 사용자가 입력한 파일 이름 사용
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Error downloading the file:", error);
  //   }
  // };

  const downloadFile = async (boardId, saveFileName, orgFileName) => {
    console.log("boardId :", boardId);
    console.log("orgFileName :", orgFileName);
    console.log("saveFileName :", saveFileName);
    try {
      // 서버에 파일 다운로드 요청
      const response = await api.get(
        `/api/fileDownload/${boardId}/${saveFileName}/${orgFileName}`,
        {
          responseType: "blob", // blob 타입으로 응답받기
        }
      );

      // 응답으로 받은 데이터를 Blob 객체로 변환
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);
      console.log("url", url);
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

  const handleFileDownload = (boardId, orgFileName, saveFileName) => {
    console.log("handleFileDownload 호출");
    // value='/fileDownload/${detail.boardId}/${files.saveFileName}/${fles.orgFileName}'
    downloadFile(boardId, orgFileName, saveFileName);
  };

  useEffect(() => {
    getBoardDetail(boardId);
  }, [boardId]);

  return (
    <>
      {/* <!-- Page Heading --> */}
      <h1 className="h3 mb-2 text-gray-800">게시판</h1>
      {/* <!-- DataTales Example --> */}
      <div className="card shadow mb-4 h-75">
        <div className="card-body">
          {/* <!-- Basic Card Example --> */}
          <div className="card shadow mb-4 h-100">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary btn float-left">
                {data.title}
              </h6>
              <a href="modify.html">
                <button
                  type="button"
                  className="btn btn-primary btn float-right ml-1"
                >
                  수정
                </button>
              </a>
              <button type="button" className="btn btn-danger btn float-right">
                삭제
              </button>
            </div>
            <div className="card-body navbar-nav-scroll custom-height">
              {data.content}
            </div>
            <div className="card-body fileUpLoad">
              <label className="fileUpLoadBtn">파일</label>

              {files.map((file) => (
                <div key={file.uploadFileId} id="fileName" className="fileName">
                  <Link
                    onClick={() =>
                      handleFileDownload(
                        file.boardId,
                        file.orgFileName,
                        file.saveFileName
                      )
                    }
                  >
                    {file.orgFileName}({file.fileSize}kb)
                  </Link>
                </div>
              ))}
            </div>

            <div className="card-footer">
              <form action="#" id="replyForm" name="replyForm">
                <input type="hidden" name="boardNo" value="1" />
                <input type="hidden" name="parentCommentNo" value="0" />
                <input type="hidden" name="commentNo" value="0" />
                <ul
                  id="commentDiv"
                  style={{
                    maxHeight: "500px",
                    overflowY: "scroll",
                    overflowX: "hidden",
                  }}
                >
                  <CommentList />
                </ul>
              </form>
              <form
                action="#"
                className="flex"
                id="commentForm"
                name="commentForm"
              >
                <CommentWrite />
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /.container-fluid --> */}
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </>
  );
};

export default BoardDetail;
