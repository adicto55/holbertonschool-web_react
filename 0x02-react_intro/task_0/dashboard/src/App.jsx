import React from "react";
import "./App.css";
import holberton_logo from "./holberton_logo.jpg";

function App() {
  return (
    <>
      <div className="App-header">
        <img src={holberton_logo} />
        <h1>School dashboard</h1>
      </div>

      <div className="App-body">
        <p>Login to access the full dashboard</p>
      </div>

      <footer className="App-footer">
        <p>copyright - Holberton School</p>
      </footer>
    </>
  );
}

export default App;