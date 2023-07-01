import React from "react";
import { Panels } from "./components/panels";
import { Editor } from "./components/editor";
import { Timeline } from "./components/timeline";
import "./App.scss";

function App() {
  return (
    <div className="page">
      <section className="sidebar">
        <Panels />
      </section>
      <section className="right-content">
        <div className="header"></div>
        <Editor />
        <Timeline />
      </section>
    </div>
  );
}

export default App;
