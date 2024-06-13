import React from "react";
import api from "../../utils/api";

export const getCommentList = async (boardId) => {
  try {
    const response = await api.get(`/comments/${boardId}`);
    console.log("service : ", response);
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
    const response = await api.get(`/comments/delete`, data);
    console.log("service : ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
