import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import {
  commentUpdate,
  commentWrite,
} from "../services/comment/CommentService";

const CommentWrite = ({
  commentValue,
  boardId,
  commentId,
  onSubmit,
  modifyMode,
}) => {
  const [data, setData] = useState({
    boardId: boardId,
    commentContent: commentValue,
  });

  useEffect(() => {
    console.log(boardId);
    console.log("data useEffect 호출");
    setData({
      boardId: boardId,
      commentContent: commentValue,
    });
  }, [boardId, commentValue]);

  const handleChange = (e) => {
    setData({
      ...data,
      boardId: boardId,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (data.commentContent === "" || data.commentContent === undefined) {
      alert("댓글 내용을 입력해주세요");
    }
    try {
      const response = await commentWrite(data);
      // 부모 컴포넌트로 데이터 전송
      onSubmit(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setData({
      commentContent: "",
    });
  };

  const handleUpdate = async () => {
    if (data.commentContent === "" || data.commentContent === undefined) {
      alert("댓글 내용을 입력해주세요");
    }

    try {
      const response = await commentUpdate(commentId, data);
      console.log(response.data);
      onSubmit(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex" id="commentForm" name="commentForm">
        <input type="hidden" name="boardNo" value="1" />
        <textarea
          id="a3"
          cols={30}
          row={5}
          name="commentContent"
          className="form-control flex"
          style={{ width: "90%" }}
          placeholder="내용
       "
          onChange={handleChange}
          value={data.commentContent}
        ></textarea>
        <Link className="commentAdd flex" style={{ width: "9%" }}>
          <button
            type="button"
            className="btn btn-primary btn ml-1"
            style={{ marginTop: "0.75rem", width: "100%" }}
            onClick={modifyMode ? handleUpdate : handleSave}
          >
            등록
          </button>
        </Link>
      </div>
    </>
  );
};

export default CommentWrite;
