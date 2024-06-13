import React, { useEffect, useState } from "react";

import BoardForm from "./BoardForm";
import { useNavigate, useParams } from "react-router-dom";
import { boardDetail } from "../../services/board/BoardDetailService";
import axios from "axios";

export const BoardModify = () => {
  const navigator = useNavigate();
  const [initDetail, setInitDetail] = useState({});
  const [files, setFiles] = useState([]);
  const { boardId } = useParams(); // 동적 라우팅, 클릭한 컴포넌트의 id값 받아옴

  useEffect(() => {
    getBoardDetail(boardId);
  }, [boardId]);

  async function getBoardDetail(boardId) {
    try {
      const response = await boardDetail(boardId);
      setInitDetail(response.data.data.detail);
      setFiles(response.data.data.files);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (data) => {
    let formData = new FormData();
    console.log("data : ", data);
    console.log("files 가 없을 경우 : ", data.files);
    console.log("data.fileIdList :", data.fileIdList);

    if (data.files && data.files.length > 0) {
      data.files.forEach((file) => {
        formData.append("files", file);
      });
    }
    // deletedFilesId 배열을 개별적으로 추가
    if (data.fileIdList && data.fileIdList.length > 0) {
      data.fileIdList.forEach((id) => {
        formData.append("deletedFilesId", id);
      });
    }
    formData.append("title", data.title);
    formData.append("content", data.content);

    if (window.confirm("수정하시겠습니까? ")) {
      try {
        const response = await axios.post(`/api/modify/${boardId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("formData : ", formData);
        navigator("/detail/" + boardId);
        return response;
      } catch (error) {
        console.log("error : ", error);
      }
    }
  };

  return (
    <div>
      BoardMofify
      <BoardForm
        initDetail={initDetail}
        fileList={files}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
