import React from "react";

import BoardForm from "../../components/board/BoardForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../utils/api";

const BoardWrite = () => {
  const navigator = useNavigate();

  const handleSubmit = async (data) => {
    let formData = new FormData();

    if (data.files && data.files.length > 0) {
      for (let i = 0; i < data.files.length; i++) {
        console.log(data.files);
        formData.append("files", data.files[i].file);
      }
    }
    // deletedFilesId 배열을 개별적으로 추가
    if (data.fileIdList && data.fileIdList.length > 0) {
      data.fileIdList.forEach((id) => {
        formData.append("deletedFilesId", id);
      });
    }
    formData.append("title", data.title);
    formData.append("content", data.content);

    if (window.confirm("게시글을 저장하시겠습니까? ")) {
      try {
        const response = await api.post(`/api/write`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("response : ", response);
        navigator("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <BoardForm initDetail={[]} fileList={[]} onSubmit={handleSubmit} />
    </div>
  );
};
export default BoardWrite;
