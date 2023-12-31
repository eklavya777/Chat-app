import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from './register';
import Login from './login';
import Home from './home';
import Chat from './chat';

/*
  initially -> sharedData = {}

  after login or register -> sharedData= {
    loggedInUserId: 234
  }

  afterClickingOn users -> sharedData = {
    loggedInUserId: 234,
    selectedUserId: 67
  }
**/

const App = () => {

  const [sharedData, setSharedData] = useState({ding:1});

  return (  
    <div>
      <Routes>
          <Route path="/chat" element={<Chat sharedData={sharedData} sharedDataSetter={setSharedData}/>} />
          <Route path="/register" element={<Register sharedDataSetter={setSharedData}/>} />
          <Route path="/login" element={<Login sharedDataSetter={setSharedData}/>}/>
          <Route path="/" element={<Home />}/>
      </Routes>
    </div>
  );
};

export default App;

