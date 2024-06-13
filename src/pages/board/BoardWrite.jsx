import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const BoardWrite = () => {
  const navigator = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [fileIdList, setFileIdList] = useState([]);

  const [data, setData] = useState({
    title: "",
    content: "",
  });

  const handelInputChange = (e) => {
    console.log("handelInputChange() 호출");
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleWrite = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    console.log("data :", data);

    // for (let i = 0; i < data.files.length; i++) {
    //   console.log(data.files);
    //   formData.append("files", data.files[i].file);
    // }

    if (data.files && data.files.length > 0) {
      data.files.forEach((file) => {
        console.log("file", file);
        formData.append("files", file);
      });
    }

    formData.append("title", data.title);
    formData.append("content", data.content);

    if (window.confirm("게시글을 저장하시겠습니까? ")) {
      try {
        const response = await axios.post(`/api/write`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("formData : ", formData);
        console.log("response : ", response);
        alert("게시글을 저장했습니다.");
        navigator("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFilesChange = (e) => {
    console.log("파일 추가 시 event");
    const newFilesArray = Array.from(e.target.files).map((file) => ({
      id: uuidv4(),
      file,
    }));
    console.log("newFileArray", newFilesArray);
    setData({
      ...data,
      [e.target.name]: newFilesArray,
    });
    // setFileList({
    //   ...fileList,
    //   [e.target.name]: newFilesArray,
    // });
  };

  // 삭제할 파일의 uuid를 파라미터로 받아온다.
  const handleRemoveFile = (deletedId) => {
    // 원래의 파일 데이터 목록에서 파라미터로 받아온 파일의 아이디와 일치하지 않는 것을 삭제해얗ㅁ.
    console.log("file들 :", data.files);

    setData((prevEmpFiles) => {
      const updateFiles = prevEmpFiles.filter(
        (fileObj) => fileObj.id !== deletedId
      );
      console.log("updateFiles : ", updateFiles);
      return updateFiles;
    });
    console.log("deletedId : ", deletedId);
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
            <form
              action="#"
              method="post"
              className="h-100"
              onSubmit={handleWrite}
            >
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
                      value={data.title}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn float-right ml-1"
                    onClick={handleWrite}
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
                    value={data.content}
                  ></textarea>
                  {/* <!-- file upload --> */}
                  <div className="multiple-upload">
                    <input
                      type="file"
                      name="files"
                      multiple
                      onChange={handleFilesChange}
                    />
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
                                onClick={() => handleRemoveFile(fileObj.id)}
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

export default BoardWrite;
