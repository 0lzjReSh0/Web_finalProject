import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const Register = () => {

  const navigate = useNavigate();
  const [Error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",

  });
  const [avatar, setAvatar] = useState(null);
  // design a navigation to login page
  const JumpPage = () => navigate("/login")
  const handleUpdate = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const handleImage = (e) => {
    setAvatar([...e.target.files]);
  }

  //function to handle the submit of the register info
  const handleSubmit = async (event) => {
    event.preventDefault();
    //create a formdata to store all the data
    const formData1 = new FormData();
    formData1.append("email", user.email);
    formData1.append("password", user.password);
    formData1.append("name", user.name);
    formData1.append("avatar", avatar);
    try {
      const response = await axios.post("http://localhost:1234/api/user/register", 
        formData1,
        {headers: {
          "Content-Type": "multipart/form-data"
        }},
        
      );
      const { success } = await response.data;
      console.log(123);
      if (success) {
        console.log(JSON.stringify(success));
        alert("Registered Successfully!")
      }
    } catch (error) {
      //Show the error in the front page so that users can see
      setError("The password is not strong enough or the email has been used");
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={user.name}
            onChange={handleUpdate}
          />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Selfie Picture</label>
          <input
            type="file"
            className="form-control-file"
            id="avatar"
            accept="image/*"
            onChange={handleImage}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
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
      <input
        type="submit"
        value="submit"
        id="submit"
        placeholder="Register"
        onClick={handleSubmit}
      />
      <p>
        Click to login page
        
        <button type = "link" className = 'link'  onClick={JumpPage}>Login</button>
      </p>
      <span id="error">{Error}</span>
    </div>
  );
};

export default Register;
