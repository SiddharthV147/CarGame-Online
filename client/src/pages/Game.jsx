import React from "react";
import { RoadCanvas } from "./RoadCanvas";

const Game = () => {

  const heightScreen = screen.height;
  const widthScreen = screen.width;

  const roads = [
    {
      width: widthScreen/7,
      height: heightScreen/2,
      offset: 0,
      gap: 20,
      dividerHeight: 40
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        background: "black",
        minHeight: "100vh"
      }}
    >
      {roads.map((road, index) => (
        <RoadCanvas
          key={index}
          width={road.width}
          height={road.height}
          offset={road.offset}
          gap={road.gap}
          dividerHeight={road.dividerHeight}
        />
      ))}
    </div>
  );
};

export default Game;