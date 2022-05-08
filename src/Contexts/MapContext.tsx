import { createContext, ReactNode, useContext } from "react";
import { Map } from "ol";
import { createMapObj } from "./createMapObj";

const MapContext = createContext<Map | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const map = createMapObj();

  return <MapContext.Provider value={map}>{children}</MapContext.Provider>;
};

export const useMap = () => {
  const map = useContext(MapContext);
  if (map === undefined)
    throw new Error("useMap must be used within a MapProvider");

  return map;
};
