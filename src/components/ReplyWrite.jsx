import { useState } from "react";
import { Link } from "react-router-dom";
import {
  getCommentList,
  replyComment,
} from "../services/comment/CommentService";

const ReplyWrite = ({
  parentUsername,
  parentCommentId,
  commentContent,
  boardId,
  depth,
  onSubmit,
}) => {
  const [data, setData] = useState({
    boardId: boardId,
    parentId: parentCommentId,
    commentContent: commentContent,
    parentUsername: parentUsername,
    depth: depth,
  });
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      console.log("data : ", data);
      console.log("boardId : ", boardId);
      const response = await replyComment(data, boardId);
      console.log("response.data : ", response.data);
      onSubmit(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex" id="commentForm" name="commentForm">
        <div>To. @{parentUsername}</div>
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
            onClick={handleSubmit}
          >
            등록
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ReplyWrite;
