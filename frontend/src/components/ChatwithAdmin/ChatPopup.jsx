import { useState } from 'react';
import './ChatPopup.css';

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const currentUser = "عدي"; // مؤقتًا، لاحقًا من API

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = { name: currentUser, text: message };
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className={`chat-popup ${isOpen ? 'open' : ''}`}>
      <div className="chat-header" onClick={toggleChat}>
        <span>Chat with Admin</span>
        <div className="chat-controls">
          <button className="chat-minimize">_</button>
          <button className="chat-close" onClick={toggleChat}>×</button>
        </div>
      </div>

      {isOpen && (
        <div className="chat-body">
          <div className="chat-messages mb-3">
 {messages.map((msg, index) => (
  <div key={index} className="chat-message">
    <span className="message-sender">{msg.name}:</span>
    <span className="message-text">{msg.text}</span>
  </div>
))}


          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-control mb-2"
              rows="2"
              required
            ></textarea>
            <button type="submit" className="btn btn-primary btn-sm w-100">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;
