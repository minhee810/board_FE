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

  //   try {
  //     const response = await api.get(fileUrl, { responseType: "blob" });
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     console.log(url);
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
  const downloadFile = async (orgFileName, saveFileName) => {
    try {
      const response = await api.get(
        `/fileDownload/${boardId}/${saveFileName}/${orgFileName}`
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url);
      const a = document.createElement("a");
      a.href = url;
      a.download = orgFileName; // 사용자가 입력한 파일 이름 사용
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  const handleFileDownload = (orgFileName, saveFileName) => {
    console.log("handleFileDownload 호출");
    // value='/fileDownload/${detail.boardId}/${files.saveFileName}/${fles.orgFileName}'
    downloadFile(orgFileName, saveFileName);
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
                      handleFileDownload(file.orgFileName, file.saveFileName)
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
