import React from "react";
import "./DropdownYears.css";

// TODO: This need to be converted to a "Controlled Component" (SplitButton or something) and reset when "Reload data" is clicked.
const DropdownYears = ({ filterByYear }) => {
  const years = Array(22)
    .fill()
    .map((element, index) => index + 2000);
  const yearsOptions = ["Filter by Year"].concat(years);

  return (
    <select
      className="DropdownYears"
      onChange={(e) => filterByYear(e.target.value)}
    >
      {yearsOptions.map((v) => (
        <option value={v} key={v}>
          {v}
        </option>
      ))}
    </select>
  );
};

export default DropdownYears;
