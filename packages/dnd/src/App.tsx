import React, { useState } from "react";
import "./App.scss";

function App() {
  return (
    <div className="page">
      <section className="sidebar"></section>
      <section className="right-content">
        <div className="header"></div>
        <div className="editor-container"></div>
      </section>
    </div>
  );
}

export default App;
