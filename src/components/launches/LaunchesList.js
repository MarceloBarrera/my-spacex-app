import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "./Utils";
import "./css/LaunchesList.css";

const LaunchesList = ({ launches, errorOcurred }) => {
  return (
    <ul className="launches-list">
      {launches.map((item, index) => {
        return (
          <li key={index} className="launches-list__item">
            <div className="launches-list__flight">
              #{item.flight_number}
              <span>{item.mission_name}</span>
            </div>
            <div className="launches-list__date-rocket">
              <div className="launches-list__date">
                {formatDate(item.launch_date_local)}
              </div>
              <div className="launches-list__rocket-id">
                {item.rocket.rocket_id}
              </div>
            </div>
          </li>
        );
      })}
      {launches.length === 0 && !errorOcurred
        ? "No flights on this year..."
        : ""}
    </ul>
  );
};

LaunchesList.propTypes = {
  launches: PropTypes.array.isRequired,
};

export default LaunchesList;
