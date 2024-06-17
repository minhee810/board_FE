import React, { useEffect, useState } from "react";
import {
  deleteComment,
  getCommentList,
} from "../services/comment/CommentService";
import { dateFormat } from "../utils/utility";
import CommentWrite from "./CommentWrite";
import ReplyWrite from "./ReplyWrite";

const CommentList = ({ boardId }) => {
  const [cList, setCList] = useState([]);
  const [modifyMode, setModifyMode] = useState(false);
  const [modifyId, setModifyId] = useState("");
  const [replyId, setReplyId] = useState("");
  const [replyMode, setReplyMode] = useState(false);

  useEffect(() => {
    getList(boardId);
  }, [boardId]);

  async function getList(boardId) {
    const response = await getCommentList(boardId);
    setCList((prevCList) => response.data);
  }

  const handleCommentDelete = async (commentId) => {
    if (window.confirm("댓글을 삭제하시겠습니까? ")) {
      const response = await deleteComment(boardId, commentId);
      console.log("response : ", response);
      setCList((prev) =>
        prev.map((comment) =>
          comment.commentId === commentId
            ? { ...comment, isDeleted: "1" }
            : comment
        )
      );
    }
  };

  // 댓글 저장
  const handleSubmit = async (data) => {
    console.log("handleSubmit 호출: ");
    if (replyMode) {
      console.log("대댓글 모드 : 대댓글 작성 api 호출");
    }
    setCList((preveCList) => [...cList, data]);
  };

  // 댓글 수정
  const handleUpdate = (updatedComment) => {
    console.log("cList : ", cList);
    console.log("updatedComment : ", updatedComment);
    if (modifyMode === true) {
      setModifyMode(!modifyMode);
    }
    setCList((prevComments) =>
      prevComments.some(
        (comment) => comment.commentId === updatedComment.commentId
      )
        ? prevComments.map((comment) =>
            comment.commentId === updatedComment.commentId
              ? updatedComment
              : comment
          )
        : [...prevComments, updatedComment]
    );
  };

  // 수정할 게시글의 아이디 값을 받아온다.
  const handleModify = (modifyId) => {
    console.log(`handleModify(${modifyId}) 호출`);
    setModifyId(modifyId);
    setModifyMode(!modifyMode);
    console.log(modifyId === cList.commentId);
  };

  const handleReplyView = (replyId) => {
    console.log("대댓글 작성 버튼 클릭");
    setReplyId(replyId);
    setReplyMode(!replyMode);
    console.log("replyId === cList.commentId :", replyId === cList.commentId);
  };

  const handleReplySubmit = (replyComment) => {
    console.log("대댓글 작성 저장 로직 실행");
    console.log("replyComment : ", replyComment);
    if (replyMode) {
      setReplyMode(!replyMode);
    }
    getList(boardId);
  };

  return (
    <div>
      <form id="replyForm" name="replyForm">
        <input type="hidden" name="boardNo" value="1" />
        <input type="hidden" name="parentCommentNo" value="0" />
        <input type="hidden" name="commentNo" value="0" />
        <ul
          id="commentDiv"
          style={{
            maxHeight: "500px",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {cList &&
            cList.map((comment) => (
              <li
                key={comment.commentId}
                // data-no="1"
                // data-name="test"
                // data-date="2024-04-01 12:45:23"
                // data-parent="0"
              >
                <div
                  className="commentDiv"
                  style={{ paddingLeft: `${comment.depth}rem` }}
                >
                  {comment.isDeleted === "1" ? (
                    <>
                      <span> 삭제된 댓글입니다. </span>
                    </>
                  ) : (
                    <>
                      <div className="commentHead">
                        <div className="commentHead1">
                          <div className="commentName">{comment.username}</div>
                          <div className="commentDate">
                            {dateFormat(comment.createdDate)}
                          </div>
                        </div>

                        <div className="commentHead2">
                          <div
                            className="commentReply"
                            onClick={() => handleReplyView(comment.commentId)}
                          >
                            답글
                          </div>
                          {comment.principal === 1 && (
                            <>
                              <div
                                className="commentModify"
                                onClick={() => handleModify(comment.commentId)}
                              >
                                수정
                              </div>
                              <div
                                className="commentRemove"
                                onClick={() =>
                                  handleCommentDelete(comment.commentId)
                                }
                              >
                                삭제
                              </div>
                            </>
                          )}
                          <div
                            className="commentCancle"
                            style={{ display: "none" }}
                          >
                            취소
                          </div>
                        </div>
                      </div>
                      <div className="comment">
                        <div>
                          {comment.parentUsername && (
                            <>@{comment.parentUsername}</>
                          )}
                          {modifyMode && comment.commentId === modifyId ? (
                            <CommentWrite
                              commentValue={comment.commentContent}
                              commentId={comment.commentId}
                              comment={comment}
                              boardId={boardId}
                              onSubmit={handleUpdate}
                              modifyMode={modifyMode}
                            />
                          ) : (
                            <span>{comment.commentContent}</span>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <hr className="sidebar-divider d-none d-md-block" />
                {replyMode && comment.commentId === replyId && (
                  <ReplyWrite
                    parentUsername={comment.username}
                    parentCommentId={comment.commentId}
                    boardId={boardId}
                    depth={comment.depth}
                    onSubmit={handleReplySubmit}
                  />
                )}
              </li>
            ))}
        </ul>
      </form>
      {!modifyMode && !replyMode && (
        <CommentWrite boardId={boardId} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default CommentList;
