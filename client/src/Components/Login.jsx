import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [Error, setError] = useState({
    error: ""
  })
  const [user, setUser] = useState({
    email: "",
    password: "",
    status: false
  })
  const navigate = useNavigate();
  const JumpPost =()=> navigate("/posts")
  // const navigatePost = useNavigate("/posts")
  const handleUpdate = e => {
    setUser({...user, [e.target.id]: e.target.value})
  }
  const logOut = ()=>{
    localStorage.removeItem("auth_token");
    setUser({...user, status: false})
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:1234/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log(data);
      localStorage.setItem("auth_token", data.authToken);
      if (data.success) {
        setUser({...user, status: true})
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }


  };

  return (
    <div>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter Email"
        value={user.email}
        onChange={handleUpdate}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter Password"
        value={user.password}
        onChange={handleUpdate}
      />
      <br />
      <input type="submit" value="submit" onClick={handleSubmit} />
      <div id="error">{Error.error}</div>
      <p>
        <button className="link" onClick={JumpPost}>
          Click to posts page
        </button>
      </p>
    </div>
  );
};

export default Login;
