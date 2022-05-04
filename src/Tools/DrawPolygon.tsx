import { ReactComponent as PencilIcon } from "./pencil.svg";
import ReactTooltip from "react-tooltip";

export const DrawPolygon = () => {
  return (
    <>
      <button
        data-tip
        data-for="draw"
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
