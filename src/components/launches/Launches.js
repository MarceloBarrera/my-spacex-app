import React, { useEffect, useReducer } from "react";
import API from "./Api";
import LaunchesList from "./LaunchesList";
import { launchesReducer, initialState, actionTypes } from "./LaunchesReducer";
import "./css/Launches.css";
import logo from "./assets/spacex-logo.png";
import launchHomeImage from "./assets/img/launch-home.png";

const Launches = () => {
  const [state, dispatch] = useReducer(launchesReducer, {
    ...initialState,
  });

  const reloadData = React.useCallback(async () => {
    const launches = await API.getLaunches();
    dispatch({ type: actionTypes.SET_LAUNCHES_LIST, payload: launches });
    console.log("click", launches.length);
  }, []);

  useEffect(() => {
    (async function () {
      dispatch({ type: actionTypes.SET_START_FETCHING_LAUNCHES });

      const launches = await API.getLaunches();
      console.log(launches[0]);
      dispatch({ type: actionTypes.SET_LAUNCHES_LIST, payload: launches });
      dispatch({ type: actionTypes.SET_END_FETCHING_LAUNCHES });

      console.log("use effecft", launches.length);
    })();
  }, []);

  return (
    <div className="container">
      <div className="grid header">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <img
              style={{ width: "180px", height: "20px" }}
              src={logo}
              alt="logo spacex"
            ></img>
            <span style={{ marginLeft: "-20px", padding: "2px" }}>
              LAUNCHES
            </span>
          </div>
          <div>
            <input
              onClick={reloadData}
              data-test-submit
              type="submit"
              className="btn btn-primary float-right"
              value="Reload button"
            />
          </div>
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
