import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({sharedDataSetter}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Sending data:', { username, password });

      const response = await axios.post('http://localhost:3000/register', {
        username,
        password
      });

      console.log(response);
      if (response.status === 201) {
        console.log('Registration successful:', response.data);
        const {userId} = response.data;
        sharedDataSetter({
          loggedInUserId: userId
        })
        navigate('/chat');
      } else {
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      alert('user alredy exists');
      console.error('Registration failed:', error.message);

    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
       <h2>Register</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;


