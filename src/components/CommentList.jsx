import React, { useEffect, useState } from "react";
import {
  deleteComment,
  getCommentList,
} from "../services/comment/CommentService";
import { dateFormat } from "../utils/utility";
import CommentWrite from "./CommentWrite";

const CommentList = ({ boardId }) => {
  const [cList, setCList] = useState();
  useEffect(() => {
    getList(boardId);
  }, [boardId]);

  async function getList(boardId) {
    const response = await getCommentList(boardId);
    setCList(response.data);
  }

  const handleCommentDelete = async (commentId) => {
    const response = await deleteComment(boardId, commentId);
  };

  const handleSubmit = async (data) => {
    setCList([...cList, data]);
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
                  <div className="commentHead">
                    <div className="commentHead1">
                      <div className="commentName">@{comment.username}</div>
                      <div className="commentDate">
                        {dateFormat(comment.createdDate)}
                      </div>
                    </div>

                    <div className="commentHead2">
                      <div
                        className="commentReply"
                        onClick={() => console.log("답글 작성 버튼 ")}
                      >
                        답글
                      </div>
                      {comment.principal === 1 && (
                        <>
                          <div
                            className="commentModify"
                            onClick={() => console.log("답글 수정 버튼 ")}
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
                    <p>{comment.commentContent}</p>
                  </div>
                </div>
                <hr className="sidebar-divider d-none d-md-block" />
              </li>
            ))}
        </ul>
      </form>
      <CommentWrite boardId={boardId} onSubmit={handleSubmit} />
    </div>
  );
};

export default CommentList;
