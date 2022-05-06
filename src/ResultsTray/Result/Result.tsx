import { Feature, Geometry, Properties } from "@turf/helpers";

interface Props {
  result: Feature<Geometry, Properties>;
}

export const Result: React.FC<Props> = ({ result }) => {
  console.log("🚀 ~ file: Result.tsx ~ line 8 ~ result", result);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={result.properties?.assets.thumbnail.href}
          alt={result.properties?.title}
          style={{ width: "50px", height: "50px" }}
        />
      </div>
      <span
        style={{ fontWeight: "bold", paddingTop: "8px", textAlign: "center" }}
      >
        {result.properties?.title}
      </span>
      <span style={{ textAlign: "center" }}>
        {new Intl.DateTimeFormat("en-GB", {
          dateStyle: "full",
          timeStyle: "long",
        }).format(new Date(result.properties?.datetime))}
      </span>
    </div>
  );
};
