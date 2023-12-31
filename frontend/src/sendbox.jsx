import React, { useState } from 'react';
import axios from 'axios';
const MessageSender = () => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {

    axios.post('http://localhost:3000/sendMessage', { message })
      .then(response => {
        console.log('Message sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });

    setMessage('');
    console.log('Sending message:', message);

    
  };

  return (
    <div>
      <textarea
        placeholder="Type your message..."
        value={message}
        onChange={handleMessageChange}
      />
      <br />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessageSender;
