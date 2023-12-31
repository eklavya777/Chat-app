import React, { useState, useEffect } from 'react';
import Chat from './chat';
import { set } from 'mongoose';

const MessageList = ({ selectedId }) => {
  const [messages, setMessages] = useState([]);

  const handleRefresh = async () => {
    try {
      const response = await fetch('http://:3000/reflocalhostresh'); 
      const data = await response.json();
      setMessages(data.texts);
      setSenderid(data.senderId);
      setReceiverid(data.receiverId);
    } catch (error) {
      console.error('Error fetching messages', error);
    }
  };


  useEffect(() => {
    handleRefresh();
  }, [selectedId]);

  console.log('Messages:', messages);
  console.log('receiverid :', receiverId);
  console.log('senderid :', senderId);

  return (
    <div>
      <h2>Messages</h2>
      <button onClick={handleRefresh}>Refresh</button>
      <div className="message-container">
        <div className="receiver-messages">
          <h3>Receiver Messages</h3>
          <ul>
            {messages
              .filter(message => receiverId === selectedId)
              .map((message, index) => (
                <li key={index} className="receiver-message">{message.text}</li>
              ))}
          </ul>
        </div>

        <div className="sender-messages">
          <h3>Sender Messages</h3>
          <ul>
            {messages
              .filter(message => senderId === selectedId)
              .map((message, index) => (
                <li key={index} className="sender-message">{message.text}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MessageList;
