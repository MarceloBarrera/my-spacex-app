import React, { useEffect, useReducer } from "react";
import API from "./Api";
import LaunchesList from "./LaunchesList";
import { launchesReducer, initialState, actionTypes } from "./LaunchesReducer";
import "./css/Launches.css";

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
          <div>small logo</div>
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
      <div className="grid logo">Logo</div>
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
