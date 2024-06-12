import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BoardWrite = () => {
  const navigator = useNavigate();
  const fileListRef = useRef(null);
  const inputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState();
  const [data, setData] = useState({
    title: "",
    content: "",
    files: [],
  });

  const handelInputChange = (e) => {
    console.log("handelInputChange() 호출");
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleWrite = async (e) => {
    console.log("handleWrite() 호출");
    console.log("넘어갈 데이터들 확인 : ", data);
    e.preventDefault();
    let formData = new FormData();

    for (let i = 0; i < data.files.length; i++) {
      formData.append("files", data.files[i]);
    }
    formData.append("title", data.title);
    formData.append("content", data.content);

    if (window.confirm("게시글을 저장하시겠습니까? ")) {
      try {
        const response = await axios.post(`/api/write`, formData, {
          withCredentials: true,
        });
        console.log("response : ", response);
        alert("게시글을 저장했습니다.");
        navigator("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFilesChange = (e) => {
    setData({
      ...data,
      [e.target.name]: Array.from(e.target.files),
    });
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
                    <div id="file-list" ref={fileListRef}></div>
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
