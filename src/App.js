import React, { useState, useEffect } from "react";
import "./App.css";
import playerImage from "./player.png";
import io from "socket.io-client";
import MessageBubble from "./components/messageBubble/MessageBubble";

const socket = io(process.env.REACT_APP_SERVER_ADDRESS);

function App() {
  const [players, setPlayers] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState({});
  const [currentMessage, setCurrentMessage] = useState(null);

  useEffect(() => {
    // Emit newPlayer event when the component mounts
    socket.emit("newPlayer", { id: socket.id, x: 0, y: 0 });

    const updatePlayersListener = (playerNewPositions) => {
      setPlayers(playerNewPositions);
    };

    const messageSentListener = (newMessage) => {
      setCurrentMessage(newMessage);

      setTimeout(() => {
        setCurrentMessage(null);
      }, 5000);
    };

    socket.on("updatePlayers", updatePlayersListener);
    socket.on("messageSent", messageSentListener);
    return () => {
      socket.off("updatePlayers", updatePlayersListener);
      socket.off("messageSent", messageSentListener);
    };
  }, []);

  const handleMouseClick = (event) => {
    const offsetXAdjustment = -65; // Adjust as needed
    const offsetYAdjustment = -200; // Adjust as needed

    const mouseX = event.clientX + offsetXAdjustment;
    const mouseY = event.clientY + offsetYAdjustment;

    // Emit the new player position to the server
    socket.emit("playerMoved", { id: socket.id, x: mouseX, y: mouseY });
  };

  const handleChatInput = (event) => {
    setChatInput(event.target.value);
  };

  const sendChatMessage = (event) => {
    const targetType = event.target.tagName;
    if (
      targetType === "BUTTON" ||
      (targetType === "INPUT" && event.key === "Enter")
    ) {
      const newMessage = { id: socket.id, message: chatInput };
      setMessages({ ...messages, [socket.id]: newMessage });
      setChatInput("");

      // Optionally emit this message to the server if you want other players to see it
      socket.emit("sendMessage", newMessage);
    }
  };

  return (
    <div className="App">
      <div className="world" onClick={handleMouseClick}>
        {players.map((player) => (
          <img
            key={player.id}
            src={playerImage}
            alt={`Player ${player.id}`}
            className="character"
            style={{
              transform: `translate(${player.x}px, ${player.y}px)`,
            }}
          />
        ))}
      </div>
      <MessageBubble
        message={currentMessage?.message}
        x={currentMessage?.x}
        y={currentMessage?.y}
      />
      <div className="chatbox">
        <input
          type="text"
          value={chatInput}
          onChange={handleChatInput}
          onKeyDown={sendChatMessage}
        />
        <button onClick={sendChatMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
