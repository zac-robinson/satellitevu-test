import { useEffect, useRef, ReactNode } from "react";
import { useMap } from "../Contexts/MapContext";
import "ol/ol.css";

export const Map = ({ children }: { children?: ReactNode }) => {
  const mapRef = useRef(null);
  const map = useMap();

  useEffect(() => {
    map.setTarget(mapRef.current ?? undefined);
  }, [map]);

  return (
    <div id="map" ref={mapRef}>
      {children}
    </div>
  );
};
