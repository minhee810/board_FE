import api from "../../utils/api";

export const getCommentList = async (boardId) => {
  try {
    const response = await api.get(`/comments/${boardId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (boardId, commentId) => {
  try {
    const data = {
      boardId: boardId,
      commentId: commentId,
    };
    const response = await api.put(`/api/comments/delete`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const commentWrite = async (data) => {
  console.log("commentSave() ", data);
  try {
    const response = await api.post(`/api/comments`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const commentUpdate = async (commentId, comment) => {
  console.log(commentId, comment);
  const data = {
    boardId: comment.boardId,
    commentId: commentId,
    commentContent: comment.commentContent,
  };
  try {
    const response = await api.put(`/api/comments`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
