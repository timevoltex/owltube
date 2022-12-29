import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login_page";
import PostListPage from "./pages/post_list_page";
import PostPage from "./pages/post_page";
import RegisterPage from "./pages/register_page";
import WritePage from "./pages/write_page";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<PostListPage />} path="/@:username" />
        <Route element={<PostListPage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<WritePage />} path="/write" />
        <Route element={<PostPage />} path="/@:username/:postId" />
      </Routes>
    </div>
  );
}

export default App;
