import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as createMapObj from "../Contexts/createMapObj";
import { MapProvider } from "../Contexts/MapContext";
import { DrawPolygon } from "./DrawPolygon";

beforeEach(() => {
  jest.clearAllMocks();
});

it("should render the icon correctly", () => {
  render(
    <MapProvider>
      <DrawPolygon />
    </MapProvider>
  );

  expect(screen.getByRole("button"));
});

it("should call remove feature on icon click if there is a feature", () => {
  const featureSource = {
    getFeatureById: jest.fn().mockReturnValue(true),
    removeFeature: jest.fn(),
  };
  const featureLayer = {
    get: jest.fn().mockImplementation((arg) => {
      if (arg === "name") {
        return "featureLayer";
      }
    }),
    getSource: jest.fn().mockReturnValue(featureSource),
  };
  const mapObj = {
    getAllLayers: jest.fn().mockReturnValue([featureLayer]),
    addInteraction: jest.fn(),
    removeInteraction: jest.fn(),
  };
  jest.spyOn(createMapObj, "createMapObj").mockReturnValue(mapObj);

  render(
    <MapProvider>
      <DrawPolygon />
    </MapProvider>
  );

  userEvent.click(screen.getByRole("button"));
  expect(featureSource.removeFeature).toHaveBeenCalledTimes(1);
});
