import React from "react";
import { Link } from "react-router-dom";

const CommentWrite = () => {
  return (
    <>
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
      ></textarea>
      <Link to="#" className="commentAdd flex" style={{ width: "9%" }}>
        <button
          type="button"
          className="btn btn-primary btn ml-1"
          style={{ marginTop: "0.75rem", width: "100%" }}
        >
          등록
        </button>
      </Link>
    </>
  );
};

export default CommentWrite;
