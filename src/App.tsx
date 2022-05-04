import GeoJSON from "ol/format/GeoJSON";
import { Geometry } from "ol/geom";
import VectorSource from "ol/source/Vector";
import { useEffect } from "react";
import { useItems } from "./Contexts/ItemContext";
import { useMap } from "./Contexts/MapContext";
import { Map } from "./Map/Map";
import { DateTimeSearch } from "./Search/DateTimeSearch";
import { DrawPolygon } from "./Tools/DrawPolygon";

export const App = () => {
  const items = useItems();
  const mapObj = useMap();

  useEffect(() => {
    if (items) {
      const featureLayer = mapObj
        .getAllLayers()
        .find((layer) => layer.get("name") === "featureLayer");
      const featureSource = featureLayer?.getSource() as VectorSource<Geometry>;
      featureSource.addFeatures(new GeoJSON().readFeatures(items));
    }
  }, [mapObj, items]);

  return (
    <div>
      <DrawPolygon />
      <Map></Map>
      <DateTimeSearch />
    </div>
  );
};
