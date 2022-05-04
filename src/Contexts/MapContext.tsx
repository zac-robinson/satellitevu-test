import { createContext, ReactNode, useContext } from "react";
import { Map, View } from "ol";
import { Tile } from "ol/layer";
import { OSM } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";

declare global {
  interface Window {
    mapObj: Map;
  }
}

const MapContext = createContext<Map | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const vectorSource = new VectorSource({
    format: new GeoJSON(),
    overlaps: false,
  });

  const layer = new VectorLayer({
    zIndex: 1,
    source: vectorSource,
    properties: {
      name: "featureLayer",
    },
  });

  const map = new Map({
    layers: [
      new Tile({
        source: new OSM(),
      }),
      layer,
    ],
    view: new View({
      center: [0, 0],
      zoom: 2,
      projection: "EPSG:4326", // WGS84 - provided features are in "EPSG:32630"
    }),
  });
  window.mapObj = map;

  return <MapContext.Provider value={map}>{children}</MapContext.Provider>;
};

export const useMap = () => {
  const map = useContext(MapContext);
  if (map === undefined)
    throw new Error("useMap must be used within a MapProvider");

  return map;
};
