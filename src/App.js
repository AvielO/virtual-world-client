import React, { useState, useEffect } from "react";
import "./App.css";
import Game from "./components/game/Game";
import Login from "./components/auth/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
  };
  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Game username={username} />
      )}
    </div>
  );
}

export default App;
