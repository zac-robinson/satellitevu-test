import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ResultsTray } from "./ResultsTray";

let props;

beforeEach(() => {
  props = {
    open: true,
    setOpen: jest.fn(),
    results: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-2.855178366431206, 53.28342792735047],
              [-2.8435832776938526, 53.288824216178284],
              [-2.8361132995336016, 53.28353505834237],
              [-2.8482765392180966, 53.27771011508386],
              [-2.855178366431206, 53.28342792735047],
            ],
          ],
        },
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
      },
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-2.925213042633512, 54.03540381443911],
              [-2.9040558675924877, 54.03226991577257],
              [-2.904070009052408, 54.02612615570459],
              [-2.9215304745487485, 54.02530141881736],
              [-2.925213042633512, 54.03540381443911],
            ],
          ],
        },
        properties: {
          datetime: "2021-04-20T17:53:16Z",
          title: "Nuclear power station",
          assets: {
            asset: {
              href: "https://stac.satellitevu.com/cogs/2021-04-20_17-52-54_0_550.tiff",
              type: "image/tiff; application=geotiff; profile=cloud-optimized",
              roles: ["data"],
            },
            thumbnail: {
              href: "https://stac.satellitevu.com/satellitevu-public/items/2021-04-20_17-52-54_0_550.png",
              type: "image/png",
              roles: ["thumbnail"],
              title: "Preview",
            },
          },
        },
        id: "2021-04-20_17-52-54_0_550.tiff",
      },
    ],
  };
});

it("should render correctly when there are results", () => {
  render(<ResultsTray {...props} />);

  expect(
    screen.queryByText("There are no results found")
  ).not.toBeInTheDocument();
});

it("should render correctly when there are no results", () => {
  props.results = [];
  render(<ResultsTray {...props} />);

  expect(screen.getByText("There are no results found")).toBeInTheDocument();
});

it("should call setOpen when the close button is clicked", () => {
  render(<ResultsTray {...props} />);

  const buttons = screen.getAllByRole("button");
  const closeBtn = buttons.find((btn) =>
    btn.className.includes("rs-drawer-header-close")
  );

  userEvent.click(closeBtn);
  expect(props.setOpen).toHaveBeenCalledTimes(1);
  expect(props.setOpen).toHaveBeenCalledWith(false);
});
