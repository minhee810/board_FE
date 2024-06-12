import React, { useEffect, useState } from "react";

import BoardForm from "./BoardForm";
import { useParams } from "react-router-dom";
import {
  boardDetail,
  boardUpdate,
} from "../../services/board/BoardDetailService";
import axios from "axios";
import api from "../../utils/api";

export const BoardMofify = () => {
  console.log("안녕하세요 BoardMofify입니다.");
  const [initDetail, setInitDetail] = useState({});
  const [files, setFiles] = useState([]);
  const [fileIdList, setFileIdList] = useState([]);
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
    console.log("data @@@ ", data);
    let formData = new FormData();
    console.log("dataFileIdList :", data.fileIdList);
    for (let i = 0; i < initDetail.files.length; i++) {
      formData.append("files", initDetail.files[i]);
    }
    formData.append("deletedFilesId", data.fileIdList);
    formData.append("title", data.title);
    formData.append("content", data.content);
    console.log("data", data);
    console.log("formData", formData);
    console.log("boardId : ", boardId);
    if (window.confirm("게시글을 수정하시겠습니까? ")) {
      try {
        const response = await axios.post(`/api/modify/` + boardId, formData);
        console.log("service response : ", response);
        alert("게시글을 수정했습니다.");
        return response;
      } catch (error) {
        console.log(error);
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
