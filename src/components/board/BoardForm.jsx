import React, { useContext, useEffect, useState } from "react";
import "../../assets/styles/board/board-detail.css";
import { UserObjContext } from "../../context/UserObjContext";
import "../../assets/styles/board/load-file.css";
import { v4 as uuidv4 } from "uuid";

// 초기값은 빈 객체로 초기화
const BoardForm = ({ initDetail = {}, fileList, onSubmit }) => {
  // formData 초기값 설정
  const [data, setData] = useState(initDetail);
  const [files, setFiles] = useState([]); // 기존 파일 배열
  const [fileIdList, setFileIdList] = useState([]);
  const [empFiles, setEmpFiles] = useState([]); // 화면 보여주기 용
  const { userData, setUserData } = useContext(UserObjContext);

  // 각 필드에 초깃 값을 할당
  // 의존성 배열을 추가하는 이유 : 부모가 넘겨준 props가 변경될 때마다 재 랜더링을 해서 상태변경을 시켜주기 위해
  useEffect(() => {
    setData(initDetail); // 기존 제목, 내용 + 새로 추가되는 파일 데이터 보관
    setFiles(fileList); // 기존 파일
  }, [initDetail, fileList]);

  // 입력값 변경 체크
  const handelInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    // console.log("files : ", files);
    // console.log(fileIdList);
  };

  // 파일값 변경 체크
  // 파일 관리랑 본문 데이터 관리를 따로 하자!
  const handleFilesChange = (e) => {
    const newFilesArray = Array.from(e.target.files).map((file) => ({
      id: uuidv4(),
      file,
    }));

    console.log("newFilesArray :", newFilesArray);
    setData({
      ...data,
      [e.target.name]: newFilesArray,
    });
  }; /// ...  하는 이유 배열에 배열을 추가하는 것이기 땨문에 중첩을 피하기 위해 다음과 같이 표기

  // 제출 버튼 : 부모 컴포넌트로 값을 넘기기 예를 들면, 수정페이지, 작성페이지, 상세보기 페이지
  const handleSubmit = () => {
    console.log("data :", data);
    onSubmit({ ...data, fileIdList });
  };

  const handleDeleteNewFile = (deletedId) => {
    console.log("파일들:", data.files);
    console.log("deletedId : ", deletedId);
    setData((prevEmpFiles) => {
      // data.files가 배열인지 확인
      const filesArray = Array.isArray(prevEmpFiles.files)
        ? prevEmpFiles.files
        : [];

      const updateFiles = filesArray.filter(
        (fileObj) => fileObj.id !== deletedId
      );
      console.log("updateFiles:", updateFiles);
      return { ...prevEmpFiles, files: updateFiles };
    });
    console.log("deletedId:", deletedId);
  };

  const handleDeleteExistFile = (deletedId) => {
    console.log("파일들:", files);
    console.log("deletedId : ", deletedId);
    // 파일 아이디 리스트에서 기존의 리스트 + 파라미터로 넘어온 파일 아이디 저장
    // 비동기 적으로 가져오는 문제를 해결하기 위해 아이디를 가져와 리스트를 변경해주는 부분을 다음과 같이 처리
    setFileIdList((prevFileList) => {
      const deleteFileIdList = [...prevFileList, deletedId];
      console.log("deleteFileIdList : ", deleteFileIdList);
      return deleteFileIdList;
    });

    setFiles((prevEmpFiles) => {
      // data.files가 배열인지 확인
      const filesArray2 = Array.isArray(prevEmpFiles) ? prevEmpFiles : [];

      const updateFiles = filesArray2.filter(
        (file) => file.uploadFileId !== deletedId
      );
      console.log("updateFiles:", updateFiles);
      return updateFiles; // 여기서 업데이트된 파일 목록을 반환
    });
    console.log("deletedId:", deletedId);
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
            <form method="post" className="h-100">
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
                    type="button"
                    className="btn btn-primary btn float-right ml-1"
                    onClick={handleSubmit}
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
                    {/* 새로 추가된 파일 목록 출력 : data.files */}
                    {data.files && (
                      <div id="file-list">
                        {data.files.map((fileObj) => (
                          <div
                            key={fileObj.id}
                            id="fileName"
                            className="fileName"
                          >
                            <span className="file-item">
                              {fileObj.file.name}
                              <button
                                type="button"
                                className="delete-button"
                                onClick={() => handleDeleteNewFile(fileObj.id)}
                              >
                                x
                              </button>
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* 기존의 파일 목록 추가  */}
                    {files && (
                      <div id="file-list">
                        {files.map((file) => (
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
                                  handleDeleteExistFile(file.uploadFileId)
                                }
                              >
                                x
                              </button>
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
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
