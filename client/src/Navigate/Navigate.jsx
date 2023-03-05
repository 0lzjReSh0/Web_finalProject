import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Home from "../Components/Home";
import Posts from "../Components/posts";

/**Version 2.0 */

//this is the Home routing file for all the route
//If the page are not found, it will show on the page
const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="*" element={"Error: Page Not Found"} />
      </Routes>
    </Router>
  );
};

export default Navigation;
