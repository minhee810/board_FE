import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { boardList } from "../../services/board/BoardTableService";
import Pagenation from "../../components/Pagenation";
import { dateFormat } from "../../utils/utility";

const BoardTables = () => {
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [bList, setBlist] = useState([]);
  const navigate = useNavigate();

  async function getBoardList(page) {
    try {
      const response = await boardList(page);
      const data = response.data;
      setData(data);
      setList(response.data.boardList.content);
      setBlist(response.data.boardList);
    } catch (error) {
      console.log("error :", error);
    }
  }

  const handleBoardDetail = (boardId) => {
    navigate(`/detail/${boardId}`);
    console.log(boardId);
  };

  const handlePageChange = (page) => {
    getBoardList(page);
  };

  useEffect((page) => {
    // 컴포넌트 마운트 시 기본 목록 가져오기
    getBoardList(page);
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
                {list.map((lists) => (
                  <tr
                    key={lists.boardId}
                    onClick={() => handleBoardDetail(lists.boardId)}
                  >
                    <td>{lists.username}</td>
                    <td>{lists.title}</td>
                    <td>{dateFormat(lists.createdDate)}</td>
                    <td>{lists.commentCnt}</td>
                  </tr>
                ))}
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
      <Pagenation
        bList={bList}
        startBlockPage={data.startBlockPage}
        endBlockPage={data.endBlockPage}
        onPageChange={handlePageChange}
      />

      {/* { <!-- End of Main Content --> */}
      {/* <!-- Scroll to Top Button--> */}
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </>
  );
};

export default BoardTables;
