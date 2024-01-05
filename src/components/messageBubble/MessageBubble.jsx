// MessageBubble.js
import React from "react";
import "./MessageBubble.css";

const MessageBubble = ({ message, x, y }) => {
  if (!message) return null;

  const bubbleStyle = {
    transform: `translate(${x}px, ${y}px)`,
  };
  
  return (
    <div className="message-bubble" style={bubbleStyle}>
      {message}
    </div>
  );
};

export default MessageBubble;
