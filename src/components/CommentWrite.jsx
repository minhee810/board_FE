import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import {
  commentSave,
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
  const navigator = useNavigate();
  // const [modifyMode, setModifyMode] = useState(false);
  // const [comment, setComment] = useState(""); // 기존의 댓글 내용을 불러오는 함수
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
      [e.target.name]: e.target.value,
    });
  };

  // const handleSave = async () => {
  //   try {
  //     const response = await commentWrite(data);
  //     console.log("response.data : ", response.data);
  //     // setComment(response.data);
  //     onSubmit(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setData({
  //     commentContent: "",
  //   });
  // };

  const handleSave = async () => {
    try {
      const response = await commentWrite(data);
      console.log("response.data : ", response.data);
      // setComment(response.data);
      onSubmit(response.data);
    } catch (error) {
      console.log(error);
    }
    setData({
      commentContent: "",
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await commentUpdate(commentId, data.commentContent);
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
