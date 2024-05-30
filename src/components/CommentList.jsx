import React from "react";
import { Link } from "react-router-dom";

const CommentList = () => {
  return (
    <div>
      <form action="#" id="replyForm" name="replyForm">
        <input type="hidden" name="boardNo" value="1" />
        <input type="hidden" name="parentCommentNo" value="0" />
        <input type="hidden" name="commentNo" value="0" />
        <ul
          id="commentDiv"
          style="max-height: 500px; overflow-y: scroll;overflow-x: hidden;"
        >
          <li
            data-no="1"
            data-name="test"
            data-date="2024-04-01 12:45:23"
            data-parent="0"
          >
            <div class="commentDiv" style="padding-left: 2rem;">
              <div class="commentHead">
                <div class="commentHead1">
                  <div class="commentName">test</div>
                  <div class="commentDate">2024-04-01 12:45:23</div>
                </div>

                <div class="commentHead2">
                  <div class="commentReply">답글</div>

                  <div class="commentModify">수정</div>
                  <div class="commentRemove">삭제</div>

                  <div class="commentCancle" style="display:none;">
                    취소
                  </div>
                </div>
              </div>
              <div class="comment">
                <p>test</p>
              </div>
            </div>
            <hr class="sidebar-divider d-none d-md-block" />
          </li>

          <li
            data-no="4"
            data-name="test2"
            data-date="2024-04-01 12:46:49"
            data-parent="0"
          >
            <div class="commentDiv" style="padding-left: 2rem;">
              <div class="commentHead">
                <div class="commentHead1">
                  <div class="commentName">test2</div>
                  <div class="commentDate">2024-04-01 12:46:49</div>
                </div>

                <div class="commentHead2">
                  <div class="commentReply">답글</div>

                  <div class="commentCancle" style="display:none;">
                    취소
                  </div>
                </div>
              </div>
              <div class="comment">
                <p>testddd</p>
              </div>
            </div>
            <hr class="sidebar-divider d-none d-md-block" />
          </li>
        </ul>
      </form>

      <form action="#" class="flex" id="commentForm" name="commentForm">
        <input type="hidden" name="boardNo" value="1" />
        <textarea
          id="a3"
          cols={30}
          row={5}
          name="commentContent"
          class="form-control flex"
          style="width: 90%"
          placeholder="내용
           "
        ></textarea>
        <Link href="#" class="commentAdd flex" style="width: 9%">
          <button
            type="button"
            class="btn btn-primary btn ml-1"
            style="margin-top: 0.75rem;width: 100%"
          >
            등록
          </button>
        </Link>
      </form>
    </div>
  );
};

export default CommentList;
