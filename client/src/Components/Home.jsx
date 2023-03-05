import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import Register from "../Components/Register";
// import CommentForm from "../Components/Comment";
import Posts from "../Components/posts"
const Home = () => {

  

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<p>asd</p>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="*" element={"Error: Page Not Found"} />
        </Routes>
      </Router>
    </div>
  );
};

export default Home;
