import { useRef, useEffect } from "react";
import { useMap } from "../Contexts/MapContext";
import { Overlay as OLOverlay } from "ol";

export const Overlay = () => {
  const mapObj = useMap();
  const overlayRef = useRef(null);

  useEffect(() => {
    console.log(overlayRef.current);
    const x = document.getElementById("overlay");
    const test = new OLOverlay({ element: x as HTMLElement });
    mapObj.addOverlay(test);
  }, [mapObj]);

  return (
    <div id="overlay" ref={overlayRef}>
      XXXXX
    </div>
  );
};
