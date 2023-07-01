import React from "react";
import "./index.scss";

const panelColors = [
  "#FF7F50",
  "#87CEEB",
  "#EE82EE",
  "#800000",
  "#808080",
  "#008000",
  "#FFFACD",
  "#98FB98",
  "#FF69B4",
];
function getRandomNumber(max: number, min = 0) {
  return Math.floor(Math.random() * max) + min;
}

export function Panels() {
  const panelCount = getRandomNumber(20, 10);
  const panelItems = Array.from({ length: panelCount }).map(() => ({
    color: panelColors[getRandomNumber(panelColors.length)],
  }));

  return (
    <div className="panels">
      {panelItems.map((item) => (
        <div className="panel" style={{ backgroundColor: item.color }}></div>
      ))}
    </div>
  );
}
