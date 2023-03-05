import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from '../Components/Login'
import Register from "../Components/Register";
import CommentForm from "../Components/Comment";
import Posts from "../Components/posts";
const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<p>Home</p>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/comment" element={<CommentForm />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="*" element={"Error: Page Not Found"} />
      </Routes>
    </Router>
  );
};

export default Navigation;
