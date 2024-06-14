import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { commentSave, commentWrite } from "../services/comment/CommentService";

const CommentWrite = ({ boardId, onSubmit }) => {
  const navigator = useNavigate();
  // const [comment, setComment] = useState(""); // 기존의 댓글 내용을 불러오는 함수
  const [data, setData] = useState({
    commentContent: "",
    boardId: boardId,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await commentWrite(data);
      onSubmit(response.data);
    } catch (error) {
      console.log(error);
    }

    setData({
      commentContent: "",
    });
  };

  return (
    <>
      <form className="flex" id="commentForm" name="commentForm">
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
            onClick={handleSave}
          >
            등록
          </button>
        </Link>
      </form>
    </>
  );
};

export default CommentWrite;
