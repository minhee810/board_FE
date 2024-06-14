import React, { useEffect, useState } from "react";
import {
  deleteComment,
  getCommentList,
} from "../services/comment/CommentService";
import { dateFormat } from "../utils/utility";
import CommentWrite from "./CommentWrite";

const CommentList = ({ boardId }) => {
  const [cList, setCList] = useState();
  const [modifyMode, setModifyMode] = useState(false);
  const [modifyId, setModifyId] = useState("");
  const [principal, setPrincipal] = useState();

  useEffect(() => {
    getList(boardId);

    // modifyMode();
    // modifyId(modifyId);
  }, [boardId]);

  async function getList(boardId) {
    const response = await getCommentList(boardId);
    setCList(response.data);
  }

  const handleCommentDelete = async (commentId) => {
    if (window.confirm("댓글을 삭제하시겠습니까? ")) {
      const response = await deleteComment(boardId, commentId);
      console.log(response);
    }
  };

  // 댓글 저장
  const handleSubmit = async (data) => {
    console.log("handleSubmit 호출: ");
    // setCList((prevCList) => [...prevCList, { ...data, principal: 1 }]);
    setCList([...cList, data]);
  };

  // 댓글 수정
  const handleUpdate = (data) => {
    console.log("cList : ", cList);
    console.log("data : ", data);
    if (modifyMode === true) {
      setModifyMode(!modifyMode);
    }
    setCList();
    // 댓글정보를 가져와서 content 내용으로 넣는다?

    // 댓글 수정 버튼을 클릭하면 부모 컴포넌트로 데이터를 넘긴다.
    // 넘겨 받은 부모 커모넌트가 기존의 댓글 정보에 새로 응답 받은 데이터를 추가하면?
    // 밑으로 댓글이 쌓이는 문제점이 발생한다.
    // 따라서 데이터를 추가해주는 방식이 아닌 데이터를 업데이트 시켜주는? 기능을 만들어야 한다.
  };

  // 수정할 게시글의 아이디 값을 받아온다.
  const handleModify = (modifyId) => {
    console.log(`handleModify(${modifyId}) 호출`);
    setModifyId(modifyId);
    setModifyMode(!modifyMode);
    console.log(modifyId === cList.commentId);
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
                    {modifyMode && comment.commentId === modifyId ? (
                      <CommentWrite
                        commentValue={comment.commentContent}
                        boardId={boardId}
                        commentId={comment.commentId}
                        onSubmit={handleUpdate}
                        modifyMode={modifyMode}
                      />
                    ) : (
                      <p>{comment.commentContent}</p>
                    )}
                  </div>
                </div>
                <hr className="sidebar-divider d-none d-md-block" />
              </li>
            ))}
        </ul>
      </form>
      {!modifyMode && (
        <CommentWrite boardId={boardId} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default CommentList;
