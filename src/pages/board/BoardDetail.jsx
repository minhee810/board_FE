import React from "react";
import { Link } from "react-router-dom";
import CommentList from "../../components/CommentList";

const BoardDetail = () => {
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
                test 제목
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
            <div
              className="card-body navbar-nav-scroll"
              // style="height: 290px !important"
            >
              The styling for this basic card example is created by using
              default Bootstrap utility classNamees. By using utility
              classNamees, the style of the card component can be easily
              modified with no need for any custom CSS! The styling for this
              basic card example is created by using default Bootstrap utility
              classNamees. By usin
            </div>
            <div className="card-body fileUpLoad">
              <label className="fileUpLoadBtn">파일</label>
              <div id="fileName" className="fileName">
                <Link to="#" data-savename="1711943118813_listener.ora">
                  listener.ora
                </Link>
              </div>
            </div>
            <div class="card-body fileUpLoad">
              <label class="fileUpLoadBtn">파일</label>
              <div id="fileName" class="fileName">
                <Link href="#" data-savename="1711943118813_listener.ora">
                  listener.ora
                </Link>
              </div>
            </div>
            <div className="card-footer">
              <CommentList />
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /.container-fluid --> */}
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
      W
    </>
  );
};

export default BoardDetail;
