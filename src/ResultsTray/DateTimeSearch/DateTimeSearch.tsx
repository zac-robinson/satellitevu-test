import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { useItems } from "../../Contexts/ItemContext";

interface Props {
  setResults: React.Dispatch<React.SetStateAction<any>>;
}

export const DateTimeSearch: React.FC<Props> = ({ setResults }) => {
  const items = useItems();

  return (
    <div>
      <span style={{ marginRight: "8px", fontWeight: "bold" }}>
        Or search by date:
      </span>
      <Flatpickr
        data-enable-time
        onChange={(date, _, instance) => {
          if (date.length !== 2) return;

          const startDate = date[0].getTime();
          const endDate = date[1].getTime();

          const timeResult = items.features.filter((feature: any) => {
            const featureTime = new Date(feature.properties.datetime).getTime();

            return featureTime >= startDate && featureTime <= endDate;
          });
          setResults(timeResult);
          instance.close();
        }}
        options={{ mode: "range" }}
      />
    </div>
  );
};
