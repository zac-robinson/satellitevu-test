import { createContext, ReactNode, useContext } from "react";
import { Map, View } from "ol";
import { Tile } from "ol/layer";
import { OSM } from "ol/source";

declare global {
  interface Window {
    mapObj: Map;
  }
}

const MapContext = createContext<Map | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const map = new Map({
    layers: [
      new Tile({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 2,
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
