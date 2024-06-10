import React, { useState } from "react";
import api from "../../utils/api";

const BoardWrite = () => {
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    userId: "",
  });

  const handelInputChange = (e) => {
    console.log("handelInputChange() 호출");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleWrite = async (e) => {
    console.log("handleWrite() 호출");
    e.preventDefault();
    try {
      console.log("formData : ", formData);
      const response = await api.post(`/api/write`, formData);
      console.log("response : ", response);
    } catch (error) {
      console.log(error);
    }
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
            <form action="#" method="post" className="h-100">
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
                      value={formData.title}
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
                    value={formData.content}
                  />
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
