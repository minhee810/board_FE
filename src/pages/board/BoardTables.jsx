import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { boardList } from "../../services/board/BoardTableService";

const BoardTables = () => {
  const [list, setList] = useState([]);

  async function getBoardList() {
    try {
      const response = await boardList();
      console.log("response :", response.data.content);
      // setBoardList(response)
    } catch (error) {
      console.log("error :", error);
    }
  }

  useEffect(() => {
    // 컴포넌트 마운트 시 기본 목록 가져오기
    getBoardList();
  }, []);

  return (
    <>
      <h1 className="h3 mb-2 text-gray-800">게시판</h1>

      {/* <!-- DataTales Example --> */}
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id=""
              width="100%"
              cellSpacing="0"
            >
              <colgroup>
                <col width="20%" />
                <col width="40%" />
                <col width="30%" />
                <col width="20%" />
              </colgroup>

              <thead>
                <tr>
                  <th>닉네임</th>
                  <th>제목</th>
                  <th>날짜</th>
                  <th>댓글</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>홍길동</td>
                  <td>
                    <Link to="/detail">System Architect</Link>
                  </td>
                  <td>2011-04-25</td>
                  <td>0개</td>
                </tr>
              </tbody>
            </table>
            <Link to="/write">
              <button type="button" className="btn btn-primary btn float-right">
                게시글 작성
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* 페이징 처리 해야함. */}
      {/* <Pagenation /> */}

      {/* <!-- End of Main Content --> */}

      {/* <!-- Scroll to Top Button--> */}
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </>
  );
};

export default BoardTables;
