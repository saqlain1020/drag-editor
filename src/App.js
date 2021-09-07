import logo from "./logo.svg";
import "./App.css";
import DragWrapper from "./components/DragWrapper";
import Client from "./components/Client";
import React from "react";

function App() {
  const ref = React.useRef();
  return (
    <div style={{ maxWidth: "100vw" }}>
      <DragWrapper />      
      {/* <Client/> */}
    </div>
  );
}

export default App;
