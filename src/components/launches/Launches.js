import React, { useEffect, useReducer } from "react";
import API from "./Api";
import LaunchesList from "./LaunchesList";
import { launchesReducer, initialState, actionTypes } from "./LaunchesReducer";
import "./css/Launches.css";
import logo from "../../assets/spacex-logo.png";
import launchHomeImage from "../../assets/img/launch-home.png";
import Refresh from "./Refresh";

const Launches = () => {
  const [state, dispatch] = useReducer(launchesReducer, {
    ...initialState,
  });

  const loadData = React.useCallback(async () => {
    dispatch({ type: actionTypes.SET_START_FETCHING_LAUNCHES });
    const launches = await API.getLaunches();
    dispatch({ type: actionTypes.SET_LAUNCHES_LIST, payload: launches });
    dispatch({ type: actionTypes.SET_END_FETCHING_LAUNCHES });
  }, []);

  const filterByYear = (year) => {
    console.log(year);
    dispatch({
      type: actionTypes.FILTER_LAUNCHES_LIST_BY_YEAR,
      payload: year,
    });
  };

  const sort = () => {
    dispatch({
      type: actionTypes.SORT_LAUNCHES_BY_FLIGHT_NUMBER,
    });
  };

  useEffect(() => {
    (async function () {
      loadData();
    })();
  }, [loadData]);

  return (
    <div className="container">
      <div className="grid header">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <img
              style={{ width: "180px", height: "20px" }}
              src={logo}
              alt="logo spacex"
            ></img>
            <span style={{ marginLeft: "-20px", padding: "2px" }}>
              LAUNCHES
            </span>
          </div>

          <button
            onClick={loadData}
            style={{
              backgroundColor: "#215184",
              color: "#FFFFFF",
              verticalAlign: "baseline",
              width: "150px",
            }}
          >
            <span>Reload Data</span>
            <Refresh />
          </button>
        </div>
      </div>
      <div className="grid logo">
        <img
          style={{ width: "533px", height: "694px" }}
          src={launchHomeImage}
          alt="launch home"
        ></img>
      </div>
      <div className="grid content">
        <div>
          <button
            onClick={() => {
              filterByYear(2015);
            }}
            style={{
              backgroundColor: "#215184",
              color: "#FFFFFF",
              verticalAlign: "baseline",
              width: "150px",
            }}
          >
            <span>Filter by Year</span>
            <Refresh />
          </button>

          <button
            onClick={sort}
            style={{
              backgroundColor: "#215184",
              color: "#FFFFFF",
              verticalAlign: "baseline",
              width: "150px",
            }}
          >
            <span>sort</span>
            <Refresh />
          </button>
        </div>
        {state.isFetchingLaunches ? (
          <div>Fetching...</div>
        ) : (
          <LaunchesList launches={state.launchesList}></LaunchesList>
        )}
      </div>
    </div>
  );
};

export default Launches;
