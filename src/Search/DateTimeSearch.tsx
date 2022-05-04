import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

export const DateTimeSearch = () => {
  return (
    <>
      <span>Date/Time range:</span>
      <Flatpickr
        data-enable-time
        onChange={(date) => {
          console.log("test", date);
        }}
        options={{ mode: "range" }}
      />
    </>
  );
};
