import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


/**Version 2.0  Show the home page about the system */
const Home = () => {
  //this is the Home showing page for all the user

  /**degined in BootStrap */
  return (
    <div>
      <div className="container text-center bg-light">
        <div className="row justify-content-center">
          <div className="col-12">
            <h1 className="text-primary">Codecode</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-10 col-md-8 col-lg-6">
            <h2 className="text-secondary">
              Welcome to Codecode sharing system!
            </h2>
            <p className="text-dark">
              Here you can find and share code snippets with other developers in
              many kinds of programming languages.
            </p>
            <p className="text-dark">
              Explore our collection of code snippets or try to create your own.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
