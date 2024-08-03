import React from "react";
import Mapbox from "./components/mapbox";

export default function Home() {
  return (
    <div className="grid place-content-center">
      <div className="flex items-center justify-between">
        <Mapbox />
      </div>
  </div>
  );

}
