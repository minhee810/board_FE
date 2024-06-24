import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommentList from "../../components/comments/CommentList";
import "../../assets/styles/board/board-detail.css";
import {
  boardDelete,
  boardDetail,
  downloadFile,
} from "../../services/board/BoardDetailService";
import { UserObjContext } from "../../context/UserObjContext";

const BoardDetail = () => {
  const navigator = useNavigate();
  const { boardId } = useParams(); // 동적 라우팅, 클릭한 컴포넌트의 id값 받아옴
  const [data, setData] = useState([]);
  const [files, setFiles] = useState([]);
  const { userData, setUserData } = useContext(UserObjContext);

  const [isAuthor, setIsAuthor] = useState(false); // 글 작성자와 로그인 사용자의 정보가 일치하는지

  const handleFileDownload = (boardId, orgFileName, saveFileName) => {
    console.log("handleFileDownload 호출");
    downloadFile(boardId, orgFileName, saveFileName);
  };

  useEffect(() => {
    getBoardDetail(boardId);
  }, [boardId]);

  async function getBoardDetail(boardId) {
    try {
      const response = await boardDetail(boardId);
      setData(response.data.data.detail);
      setFiles(response.data.data.files);
    } catch (error) {
      console.log("error :", error);
    }
  }

  const handleDeleteBoard = async () => {
    console.log("handleDeleteBoard() 호출");

    if (window.confirm("해당 게시글을 삭제하시겠습니까? ")) {
      const response = await boardDelete(boardId);
    }
    navigator("/");
  };

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
              {userData.userId === data.writer ? (
                <>
                  <Link to={`/modify/${boardId}`}>
                    <button
                      type="button"
                      className="btn btn-primary btn float-right ml-1"
                    >
                      수정
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger btn float-right"
                    onClick={handleDeleteBoard}
                  >
                    삭제
                  </button>
                </>
              ) : null}
            </div>
            <div className="card-body navbar-nav-scroll custom-height">
              {data.content}
            </div>
            <div className="card-body fileUpLoad">
              <label className="fileUpLoadBtn">파일</label>

              {files.map((file) => (
                <div key={file.uploadFileId} id="fileName" className="fileName">
                  {userData.isLogin ? (
                    <Link
                      onClick={() =>
                        handleFileDownload(
                          file.boardId,
                          file.orgFileName,
                          file.saveFileName
                        )
                      }
                    >
                      {file.orgFileName}({file.fileSize} KB)
                    </Link>
                  ) : (
                    <span
                      onClick={() =>
                        handleFileDownload(
                          file.boardId,
                          file.orgFileName,
                          file.saveFileName
                        )
                      }
                    >
                      {file.orgFileName}({file.fileSize} KB)
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="card-footer">
              <CommentList boardId={boardId} />
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
