import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../utils/api";
import axios from "axios";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sessionId = localStorage.getItem("LS_SESSION_ID");

    if (sessionId) {
      const response = axios.get(`/api/user`, {
        headers: {
          Authorization: `Bearer ${sessionId}`,
        },
      });
      console.log("세션 아이디로 사용자 정보 가져오기 성공", response);
    }
    if (sessionId === null) {
      console.log("세션 아이디 없음");
    }
  }, []);

  return (
    <UserContext.Provider
      children={children}
      value={{ user, setUser }}
    ></UserContext.Provider>
  );
};

export function useUserContext() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext.Provider is not found");
  }
  return userContext;
}
