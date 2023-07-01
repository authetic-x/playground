import React from "react";
import "./index.scss";

export function Editor() {
  return (
    <div className="editor-container">
      <canvas className="editor" width={600} height={600} />
    </div>
  );
}
