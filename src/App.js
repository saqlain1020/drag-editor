import logo from "./logo.svg";
import "./App.css";
import React from "react";
import MovableWrapper from "./components/MovableWrapper";

function App() {
  const ref = React.useRef();
  return (
    <div style={{ maxWidth: "100vw", overflow: "hidden" }}>
      <div
        style={{
          width: 700,
          height: 400,
          position: "absolute",
          top: 100,
          left: 150,
        }}
      >
        <MovableWrapper />
      </div>
    </div>
  );
}

export default App;
