import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { JoinForm } from "./pages/auth/JoinForm";
import GlobalStyles from "./assets/styles/GlobalStyles";
import LoginForm from "./pages/auth/LoginForm";
import BoardTables from "./pages/board/BoardTables";
import BoardDetail from "./pages/board/BoardDetail";
import BoardWrite from "./pages/board/BoardWrite";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* 중첩 라우팅 : 레이아웃 필요 컴포넌트들 */}
          <Route path="/" element={<Layout />}>
            <Route index element={<BoardTables />} />
            <Route path=":id" element={<BoardTables />} />
            <Route path="detail" element={<BoardDetail />} />
            <Route path="write" element={<BoardWrite />} />
          </Route>
          <Route path="/join" element={<JoinForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
