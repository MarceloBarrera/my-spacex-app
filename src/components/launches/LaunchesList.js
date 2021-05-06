import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "./Utils";

const LaunchesList = ({ launches }) => {
  return (
    <>
      <ul>
        {launches.map((item, index) => {
          return (
            <li key={index}>
              #{item.flight_number}, {item.mission_name},{" "}
              {formatDate(item.launch_date_local)}, {item.rocket.rocket_id}
            </li>
          );
        })}
      </ul>
    </>
  );
};

LaunchesList.propTypes = {
  launches: PropTypes.array.isRequired,
};

export default LaunchesList;
