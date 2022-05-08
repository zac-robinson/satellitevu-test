import { render, screen } from "@testing-library/react";
import { Result } from "./Result";

it("should render the information correctly", () => {
  const result = {
    properties: {
      datetime: "2021-03-05T19:52:21Z",
      title: "Stanlow refinery",
      assets: {
        asset: {
          href: "https://stac.satellitevu.com/cogs/2021-03-05_19-51-37_0_1100.tiff",
          type: "image/tiff; application=geotiff; profile=cloud-optimized",
          roles: ["data"],
        },
        thumbnail: {
          href: "https://stac.satellitevu.com/satellitevu-public/items/2021-03-05_19-51-37_0_1100.png",
          type: "image/png",
          roles: ["thumbnail"],
          title: "Preview",
        },
      },
    },
    id: "2021-03-05_19-51-37_0_1100.tiff",
  };
  render(<Result result={result} />);

  expect(screen.getByText("Stanlow refinery")).toBeInTheDocument();
  expect(
    screen.getByText("Friday, 5 March 2021 at 19:52:21 GMT")
  ).toBeInTheDocument();
  expect(screen.getByRole("img")).toBeInTheDocument();
});
