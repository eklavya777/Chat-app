
import React, { useState } from 'react';
import axios from 'axios';
import Chat from './chat'; 
const Login = ({sharedDataSetter}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      const { success, userId } = response.data;
      console.log(`user logged in ${userId}`);
      if (success) {
        console.log("HERE1");
        setLoggedIn(true);
        const newData = {loggedInUserId: userId};
        console.log("HERE2");
        sharedDataSetter(newData);
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      {loggedIn ? (
        <Chat /> 
      ) : (
        <div>
          <h2>Login Page</h2>
          <form>
            <label>
              Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
