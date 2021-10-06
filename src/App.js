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
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <MovableWrapper />
      </div>
    </div>
  );
}

export default App;
