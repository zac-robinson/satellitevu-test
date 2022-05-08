import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Tile } from "ol/layer";
import { OSM } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import { Map, View } from "ol";

export const createMapObj = () => {
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

  return new Map({
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
};
