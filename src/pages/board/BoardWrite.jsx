import React from "react";

const BoardWrite = () => {
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
                      type="text"
                      id="a1"
                      className="form-control"
                      placeholder="제목"
                    />
                  </div>
                  <a href="tables.html">
                    <button
                      type="button"
                      className="btn btn-primary btn float-right ml-1"
                    >
                      작성완료
                    </button>
                  </a>
                </div>
                <div className="card-body h-100">
                  <textarea
                    id="a3"
                    cols="30"
                    className="form-control h-100"
                    placeholder="내용"
                    // style="resize: none"
                  ></textarea>
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
