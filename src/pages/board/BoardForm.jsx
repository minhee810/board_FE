import React, { useContext, useEffect, useState } from "react";
import "../../assets/styles/board/board-detail.css";
import { UserObjContext } from "../../context/UserObjContext";
import "../../assets/styles/board/load-file.css";

// 초기값은 빈 객체로 초기화
const BoardForm = ({ initDetail = {}, fileList, onSubmit }) => {
  // formData 초기값 설정
  const [data, setData] = useState(initDetail);
  const [files, setFiles] = useState([]);
  const [fileIdList, setFileIdList] = useState([]);
  const [empFiles, setEmpFiles] = useState([]);
  const { userData, setUserData } = useContext(UserObjContext);

  // 각 필드에 초깃 값을 할당
  // 의존성 배열을 추가하는 이유 : 부모가 넘겨준 props가 변경될 때마다 재 랜더링을 해서 상태변경을 시켜주기 위해
  useEffect(() => {
    setData(initDetail);
    setFiles(fileList);
    setEmpFiles(fileList);
  }, [initDetail, fileList]);

  // 입력값 변경 체크
  const handelInputChange = (e) => {
    console.log("handelInputChange() 호출");
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // 파일값 변경 체크
  const handleFilesChange = (e) => {
    setData({
      ...data,
      [e.target.name]: Array.from(e.target.files),
    });
    setFiles(data.files);
    setEmpFiles(data.fils);
  };

  // 제출 버튼 : 부모 컴포넌트로 값을 넘기기 예를 들면, 수정페이지, 작성페이지, 상세보기 페이지
  const handleSubmit = () => {
    console.log("fileIdList : ", fileIdList);
    onSubmit({ ...data, fileIdList });
  };

  const handleDeleteFile = (uploadFileId) => {
    console.log("handleDeleteFile() 호출");
    console.log("uploadFileId :", uploadFileId);
    console.log(`${uploadFileId}가 삭제 되었습니다.`);
    setFileIdList((prevFileList) => [...prevFileList, uploadFileId]);

    const newFileList = files.filter(
      (file) => file.uploadFileId !== uploadFileId
    );
    console.log("newFileList id : ", newFileList);
    // 임시 파일 리스트의 값만 변경해준다. 새로 파일 배열에 넣으면 서버로 날아가기 때문 임시 파일 리스트 생성
    setEmpFiles(newFileList);
  };

  return (
    <>
      {/* <!-- Begin Page Content --> */}
      <div className="container-fluid h-100">
        {/* <!-- Page Heading --> */}
        <h1 className="h3 mb-2 text-gray-800">게시판</h1>
        {/* <!-- DataTales Example --> */}
        <div className="card shadow mb-4 h-75">
          <div className="card-body">
            {/* <!-- Basic Card Example --> */}
            <form method="post" className="h-100" onSubmit={handleSubmit}>
              <div className="card shadow mb-4 h-100">
                <div className="card-header py-3">
                  <div className="col-sm-11 float-left">
                    <input
                      onChange={handelInputChange}
                      type="text"
                      id="a1"
                      name="title"
                      className="form-control"
                      placeholder="제목"
                      value={data.title || ""}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn float-right ml-1"
                    // onClick={handleSave}
                  >
                    작성완료
                  </button>
                </div>
                <div className="card-body h-100">
                  <textarea
                    onChange={handelInputChange}
                    name="content"
                    cols={30}
                    rows={15}
                    className="form-control h-100"
                    placeholder="내용"
                    style={{ resize: "none" }}
                    value={data.content || ""}
                  ></textarea>
                  {/* <!-- file upload --> */}
                  <div className="multiple-upload">
                    <input
                      type="file"
                      name="files"
                      multiple
                      onChange={handleFilesChange}
                    />
                    <div id="file-list">
                      {empFiles.map((file) => (
                        <div
                          key={file.uploadFileId}
                          id="fileName"
                          className="fileName"
                        >
                          <span className="file-item">
                            {file.orgFileName}
                            <button
                              type="button"
                              className="delete-button"
                              onClick={() =>
                                handleDeleteFile(file.uploadFileId)
                              }
                            >
                              x
                            </button>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </>
  );
};

export default BoardForm;
