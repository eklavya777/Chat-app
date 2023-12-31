import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="jumbotron centered">
      <div className="container">
        <h1 className="display-3">CHAT APPLICATION</h1>
        <p className="lead">
          Connect, chat, and share moments seamlessly with our intuitive and secure messaging platform.
        </p>
        <hr />
        <Link to="/register" className="btn btn-light btn-lg" role="button">
          Register
        </Link>
        <Link to="/login" className="btn btn-dark btn-lg" role="button">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
