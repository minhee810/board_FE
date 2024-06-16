import { useState } from "react";

const ReplyWrite = ({ parentCommentId, boardId, onSubmit }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(parentCommentId, value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={handleSubmit}>답글 달기</button>
    </div>
  );
};

export default ReplyWrite;
