import React from "react";

// Design the Navbar component
const Navbar = () => {
  // Remove the authentication token from the local storage
  const logOut = () => {
    localStorage.removeItem("auth_token");
    // Display an alert to indicate that the user has been logged out
    alert("Logout successfully");
  };
  //navigation bar using Bootstrap classes and HTML tags
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Codecode
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/register">
              Register
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/posts">
              Posts
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="logOut" href="/" onClick={logOut}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
