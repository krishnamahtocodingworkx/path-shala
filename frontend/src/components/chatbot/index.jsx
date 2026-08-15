import React, { useState } from 'react';
import axios from 'axios';
import "./style.css"

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/v1/chat/chat', { 
        prompt: input 
      });
      
      setMessages([...messages, {
        user: input,
        bot: res.data.text
      }]);
      setInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <div className="user-msg">{msg.user}</div>
            <div className="bot-msg">{msg.bot}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about courses..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBot;
