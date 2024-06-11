import React, { useContext } from "react";
import { UserObjContext } from "../../context/UserObjContext";
import { useNavigate } from "react-router-dom";

const WriteButton = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserObjContext);

  const handleBoardWrite = () => {
    console.log("wrtie button : isAuthenticated : ", userData);
    if (userData.userId == null) {
      console.log("로그인하지 않은 사용자의 접근");
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    } else {
      console.log("로그인한 사용자의 접근");
      navigate("/write");
    }
  };

  return (
    <button
      type="button"
      className="btn btn-primary btn float-right"
      onClick={handleBoardWrite}
    >
      게시글 작성
    </button>
  );
};

export default WriteButton;
