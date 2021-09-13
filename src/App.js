import logo from "./logo.svg";
import "./App.css";
import DragWrapper from "./components/DragWrapper";
import React from "react";
import MovableWrapper from "./components/MovableWrapper";

function App() {
  const ref = React.useRef();
  return (
    <div style={{ maxWidth: "100vw",overflow:"hidden" }}>
      {/* <DragWrapper />       */}
      {/* <Client/> */}
      <MovableWrapper/>
    </div>
  );
}

export default App;
