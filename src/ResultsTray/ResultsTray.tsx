import { Feature, Geometry, Properties } from "@turf/helpers";
import { Drawer, Button } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Result } from "./Result/Result";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  results: Feature<Geometry, Properties>[] | undefined;
}

export const ResultsTray: React.FC<Props> = ({ open, setOpen, results }) => {
  console.log("🚀 ~ file: ResultsTray.tsx ~ line 11 ~ results", results);
  return (
    <Drawer
      size={"md"}
      placement={"bottom"}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Drawer.Header>
        <Drawer.Title>Results</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={() => setOpen(false)} appearance="primary">
            Close
          </Button>
        </Drawer.Actions>
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
            ? results?.map((result) => {
                return (
                  <Result result={result} key={result.properties?.datetime} />
                );
              })
            : "There are no results found"}
        </div>
      </Drawer.Body>
    </Drawer>
  );
};
