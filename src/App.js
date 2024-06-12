import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { JoinForm } from "./pages/auth/JoinForm";
import "./assets/styles/sb-admin-2.css";
import "./assets/styles/sb-admin-2.min.css";
import "./index.css";
import LoginForm from "./pages/auth/LoginForm";
import BoardTables from "./pages/board/BoardTables";
import BoardDetail from "./pages/board/BoardDetail";
import BoardWrite from "./pages/board/BoardWrite";
import { UserContextProvider } from "./context/UserObjContext";
import PrivateRoute from "./components/PrivateRoute";
import { BoardMofify } from "./pages/board/BoardMofify";

function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            {/* 중첩 라우팅 : 레이아웃 필요 컴포넌트들 */}
            <Route path="/" element={<Layout />}>
              <Route index element={<BoardTables />} />
              <Route path=":id" element={<BoardTables />} />
              <Route path="/detail/:boardId" element={<BoardDetail />} />
              {/*로그인한 사용자만 접근 가능하도록 처리*/}
              <Route element={<PrivateRoute />}>
                <Route path="/write" element={<BoardWrite />} />
                <Route path="/modify/:boardId" element={<BoardMofify />} />
              </Route>
            </Route>
            <Route path="/join" element={<JoinForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
