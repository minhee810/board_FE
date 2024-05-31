import React from "react";

const CommentList = () => {
  return (
    <div>
      <li
        data-no="1"
        data-name="test"
        data-date="2024-04-01 12:45:23"
        data-parent="0"
      >
        <div className="commentDiv" style={{ paddingLeft: "2rem" }}>
          <div className="commentHead">
            <div className="commentHead1">
              <div className="commentName">test</div>
              <div className="commentDate">2024-04-01 12:45:23</div>
            </div>

            <div className="commentHead2">
              <div className="commentReply">답글</div>

              <div className="commentModify">수정</div>
              <div className="commentRemove">삭제</div>

              <div className="commentCancle" style={{ display: "none" }}>
                취소
              </div>
            </div>
          </div>
          <div className="comment">
            <p>test</p>
          </div>
        </div>
        <hr className="sidebar-divider d-none d-md-block" />
      </li>
    </div>
  );
};

export default CommentList;
