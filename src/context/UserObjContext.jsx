import React, { createContext, useState } from "react";

export const UserObjContext = createContext();

export const UserContextProvider = ({ children }) => {
  // 사용자의 정보를 저장
  const [userData, setUserData] = useState(() => {
    // 로컬스토리지 값 꺼내기
    const storedUserData = localStorage.getItem("userData");

    console.log("storedUserData : ", JSON.parse(storedUserData));

    let initialUserData = storedUserData
      ? JSON.parse(storedUserData)
      : {
          userId: null,
          username: "Guest",
        };

    // 사용자 정보 초기화
    console.log("initialUserData : ", initialUserData);
    return initialUserData;
  });

  return (
    <UserObjContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserObjContext.Provider>
  );
};
