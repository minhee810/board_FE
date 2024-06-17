import React from "react";
import api from "../../utils/api";

export const checkDuplicateUsername = async (username) => {
  console.log("checkDuplicateUsername 호출");
  try {
    const response = await api.get(`/username/${username}/check`);
    return response.data;
  } catch (error) {
    console.log("error.response.status : ", error.response.status);
  }
};

export const checkDuplicateEmail = async (email) => {
  console.log("checkDuplicateEmail 호출");
  try {
    const response = await api.get(`/email/${email}/check`);
    return response.data;
  } catch (error) {
    console.log("error.response.status : ", error.response.status);
  }
};
