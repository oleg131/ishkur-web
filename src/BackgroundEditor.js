import React from "react";
import { ImageMap } from "@qiuz/react-image-map";

import mapData from "./data/maps.json";

export default function BackgroundEditor({ type }) {
  const img = `/background/type_${type}.png`;

  const ImageMapComponent = React.useMemo(() => {
    const mapArea = mapData[type];

    mapArea.forEach((element, index) => {
      element.style = { background: "rgba(255, 0, 0, 0.5)", cursor: "pointer" };
      element.id = index;
    });

    const onMapClick = (area, index) => {
      const res = prompt("?");
      area.genre = res;
      document.getElementById(index).style.background = "rgba(0, 255, 0, 0.5)";

      console.log(mapArea);
      console.log("remaining", mapArea.filter((x) => !x.genre).length);
    };

    return (
      <ImageMap
        className="usage-map"
        src={img}
        map={mapArea}
        onMapClick={onMapClick}
      />
    );
  }, [type, img]);

  return <div>{ImageMapComponent}</div>;
}
