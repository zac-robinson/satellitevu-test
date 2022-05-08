import { Feature, Properties, Geometry } from "@turf/helpers";
import GeoJSON from "ol/format/GeoJSON";
import { Geometry as OLGeometry } from "ol/geom";
import VectorSource from "ol/source/Vector";
import { useEffect, useState } from "react";
import { useItems } from "./Contexts/ItemContext";
import { useMap } from "./Contexts/MapContext";
import { Map } from "./Map/Map";
import { Overlay } from "./Map/Overlay";
import { ResultsTray } from "./ResultsTray";
// import { DateTimeSearch } from "./Search/DateTimeSearch";
import { DrawPolygon } from "./Tools/DrawPolygon";

export const App = () => {
  const items = useItems();
  const mapObj = useMap();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [results, setResults] = useState<Feature<Geometry, Properties>[]>();

  useEffect(() => {
    if (items) {
      const featureLayer = mapObj
        .getAllLayers()
        .find((layer) => layer.get("name") === "featureLayer");

      const featureSource =
        featureLayer?.getSource() as VectorSource<OLGeometry>;
      featureSource.addFeatures(new GeoJSON().readFeatures(items));
    }
  }, [mapObj, items]);

  return (
    <div>
      <Overlay />
      <DrawPolygon openResultsTray={setDrawerOpen} setResults={setResults} />
      <Map />
      {/* <DateTimeSearch /> */}
      <ResultsTray
        open={drawerOpen}
        setOpen={setDrawerOpen}
        results={results}
      />
    </div>
  );
};
