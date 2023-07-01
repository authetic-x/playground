import React from "react";

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
  "#FFFFFF",
];
function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

export function Panels() {
  const panelCount = getRandomNumber(20);
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
