import React, { useEffect } from "react";
import "./App.scss";
import { initializeController } from "./initialize";

function App() {
  useEffect(() => {
    initializeController.initialize();
  });

  return (
    <div className="page">
      <section className="sidebar"></section>
      <section className="right-content">
        <div className="header"></div>
      </section>
    </div>
  );
}

export default App;
