import { useEffect, useRef, useState } from "react";
import ReactTooltip from "react-tooltip";
import { Draw } from "ol/interaction";
import { useMap } from "../Contexts/MapContext";
import { Geometry } from "ol/geom";
import VectorSource from "ol/source/Vector";
import { ReactComponent as PencilIcon } from "./pencil.svg";
import { DrawEvent } from "ol/interaction/Draw";
import GeoJSON from "ol/format/GeoJSON";
import booleanIntersects from "@turf/boolean-intersects";

interface Props {
  openResultsTray: React.Dispatch<React.SetStateAction<boolean>>;
  setResults: React.Dispatch<React.SetStateAction<any>>;
}

export const DrawPolygon: React.FC<Props> = ({
  openResultsTray,
  setResults,
}) => {
  const mapObj = useMap();
  const [isActive, setIsActive] = useState(false);

  const featureLayer = mapObj
    .getAllLayers()
    .find((layer) => layer.get("name") === "featureLayer");
  const featureSource = featureLayer?.getSource() as VectorSource<Geometry>;

  const drawInteraction = useRef(
    new Draw({
      source: featureSource,
      type: "Polygon",
    })
  );

  useEffect(() => {
    const draw = drawInteraction.current;

    const drawStartHandler = () => {
      const feature = featureSource.getFeatureById("searchPoly");
      feature && featureSource.removeFeature(feature);
    };

    const drawEndHandler = (event: DrawEvent) => {
      setIsActive(false);
      event.feature.setId("searchPoly");

      const drawnFeature = new GeoJSON().writeFeatureObject(event.feature);
      const featureCollection = new GeoJSON().writeFeaturesObject(
        featureSource.getFeatures()
      );

      const intersectingFeatures = featureCollection.features.filter(
        (feature: any) => {
          return booleanIntersects(drawnFeature, feature) && feature;
        }
      );
      openResultsTray(true);
      setResults(intersectingFeatures);
    };

    draw.on("drawstart", drawStartHandler);
    draw.on("drawend", drawEndHandler);
    draw.setActive(isActive);

    mapObj.addInteraction(draw);

    return () => {
      draw.un("drawstart", drawStartHandler);
      draw.un("drawend", drawEndHandler);
      mapObj.removeInteraction(draw);
    };
  }, [isActive, mapObj, openResultsTray, setResults, featureSource]);

  const clickHandler = () => {
    const feature = featureSource.getFeatureById("searchPoly");
    feature && featureSource.removeFeature(feature);
    setIsActive((prevState) => !prevState);
  };

  return (
    <>
      <button
        data-tip
        data-for="draw"
        onClick={clickHandler}
        style={{
          position: "absolute",
          bottom: 25,
          left: 25,
          zIndex: 2,
          padding: "8px",
        }}
      >
        <PencilIcon />
      </button>
      <ReactTooltip id="draw" effect="solid">
        <span>Draw Search Polygon</span>
      </ReactTooltip>
    </>
  );
};
