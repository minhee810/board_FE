import React, { createContext, useState } from "react";

export const UserObjContext = createContext();

const initData = {
  userId: null,
  username: "Guest",
};
/**
 * 새로고침이 될 때 마다 컨텍스트가 호출되면서 로컬 스토리지에 있는 사용자의 정보를 꺼내서 다시 컨텍스트에 넣어준다.
 * 만약에 그롬 로컬 스토리에제 사용자의 값이 없을 경우에는?
 * user 정보를 초기화 해주는 객체를 넣어서 Guest 즉, 로그인이 되지 않은 사용자의 정보를 임의로 저장해준다.
 * 🌱 나중에 로그인 정보를 확인해야할 수도 있으니까 context 에 함께 저장하는 경우도 함께 생각해봐야겠다.
 */
export const UserContextProvider = ({ children }) => {
  console.log("UserContextProvide 랜더링");
  const storedUserData = sessionStorage.getItem("userData");
  let data = storedUserData ? JSON.parse(storedUserData) : initData;

  const [userData, setUserData] = useState(data);
  // 사용자의 정보를 저장
  // const [userData, setUserData] = useState(() => {
  //   console.log("userData useState 랜더링");
  //   // 로컬스토리지 값 꺼내기
  //   const storedUserData = localStorage.getItem("userData");

  //   console.log("storedUserData : ", JSON.parse(storedUserData));

  //   console.log("context 에서 객체 다시 초기화 시기");
  //   let initialUserData = storedUserData
  //     ? JSON.parse(storedUserData)
  //     : {
  //         userId: null,
  //         username: "Guest",
  //       };

  //   // 사용자 정보 초기화
  //   console.log("initialUserData : ", initialUserData);

  //   return initialUserData;
  // });
  return (
    <UserObjContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserObjContext.Provider>
  );
};

/**
 *
 */
