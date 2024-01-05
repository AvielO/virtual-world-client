// MessageBubble.js
import React from "react";
import "./MessageBubble.css";

const MessageBubble = ({ message, x, y }) => {
  if (!message) return null;

  return (
    <div className="message-bubble" style={{ left: x, top: y }}>
      {message}
    </div>
  );
};

export default MessageBubble;
