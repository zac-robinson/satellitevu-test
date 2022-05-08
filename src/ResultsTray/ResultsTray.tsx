import { Feature, Geometry, Properties } from "@turf/helpers";
import { Drawer } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Result } from "./Result";
import { DateTimeSearch } from "./DateTimeSearch/DateTimeSearch";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  results: Feature<Geometry, Properties>[] | undefined;
  setResults: React.Dispatch<React.SetStateAction<any>>;
}

export const ResultsTray: React.FC<Props> = ({
  open,
  setOpen,
  results,
  setResults,
}) => (
  <Drawer
    size={"md"}
    placement={"bottom"}
    open={open}
    onClose={() => setOpen(false)}
  >
    <Drawer.Header>
      <Drawer.Title>Results</Drawer.Title>
      <DateTimeSearch setResults={setResults} />
    </Drawer.Header>
    <Drawer.Body>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          height: "100%",
        }}
      >
        {results?.length
          ? results?.map((result) => (
              <Result result={result} key={result.properties?.datetime} />
            ))
          : "There are no results found"}
      </div>
    </Drawer.Body>
  </Drawer>
);
