import React, { useState, useEffect } from "react";
import "./App.css";
import playerImage from "./player.png";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_SERVER_ADDRESS);

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Emit newPlayer event when the component mounts
    socket.emit("newPlayer", { id: socket.id, x: 0, y: 0 });

    const updatePlayersListener = (playerNewPositions) => {
      setPlayers(playerNewPositions);
    };
    socket.on("updatePlayers", updatePlayersListener);

    return () => {
      socket.off("updatePlayers", updatePlayersListener);
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
    </div>
  );
}

export default App;
