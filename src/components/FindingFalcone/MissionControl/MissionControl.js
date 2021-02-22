import React, { useState, useEffect, useCallback } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Grid,
  Paper,
  withStyles,
  CircularProgress,
  Button
} from "@material-ui/core";

import { fetchAuthToken } from "../../../store/actions/authActions";
import {
  fetchPlanets,
  fetchVehicles,
  findFalcone
} from "../../../store/actions/fetchActions";
import {
  incrementVehicleCount,
  decrementVehicleCount,
  updateTotalSearchTime
} from "../../../store/actions/updateActions";

import PlanetVehicleSelection from "../PlanetVehicleSelection/PlanetVehicleSelection";
import { DESTINATION_COUNT } from "../../../config/constants";
import styles from "./MissionControl.styles";

const MissionControl = ({
  fetchAuthToken,
  fetchPlanets,
  fetchVehicles,
  findFalcone,
  updateTotalSearchTime,
  planets = [],
  vehicles = [],
  classes,
  totalSearchTime,
  errorText,
  token,
  history
}) => {
  const destinationsList = Array.from(
    Array(DESTINATION_COUNT),
    (_, index) => `Destination ${index + 1}`
  );
  const [selectedPlanets, setSelectedPlanets] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const { root, headerColor, reset, actions } = classes;

  useEffect(() => {
    fetchAuthToken();
    fetchPlanets();
    fetchVehicles();
    updateTotalSearchTime(0);
  }, [fetchAuthToken, fetchPlanets, fetchVehicles, updateTotalSearchTime]);

  const getTimeTaken = useCallback(() => {
    const distanceMap = new Map();
    let timeTaken = 0;
    planets.forEach((planet) => {
      const index = selectedPlanets.indexOf(planet.name);
      if (index > -1) {
        const vehicle = selectedVehicles[index];
        distanceMap.set(vehicle, planet.distance);
      }
    });
    vehicles.forEach(({ name, speed }) => {
      const planetDistance = distanceMap.get(name);
      if (planetDistance) {
        timeTaken += planetDistance / speed;
      }
    });
    updateTotalSearchTime(timeTaken);
  }, [
    planets,
    selectedPlanets,
    selectedVehicles,
    updateTotalSearchTime,
    vehicles
  ]);

  useEffect(() => {
    getTimeTaken();
  }, [getTimeTaken, selectedPlanets, selectedVehicles]);

  const onSubmitData = () => {
    findFalcone({
      requestData: {
        token,
        planet_names: selectedPlanets,
        vehicle_names: selectedVehicles
      },
      history
    });
  };

  const onReset = () => {
    setSelectedPlanets([]);
    setSelectedVehicles([]);
    updateTotalSearchTime(0);
  };

  const handlePlanetChange = (planetName, planetIndex) => {
    const selectedPlanetsList = [...selectedPlanets];
    selectedPlanetsList[planetIndex] = planetName;
    setSelectedPlanets(selectedPlanetsList);
  };

  const handleVehicleChange = (vehicleName, planetIndex) => {
    const selectedVehiclesList = [...selectedVehicles];
    selectedVehiclesList[planetIndex] = vehicleName;
    setSelectedVehicles(selectedVehiclesList);
  };

  const isAllSelected = () => {
    const selectedPlanetCount = selectedPlanets.reduce((count, current) => {
      return current ? ++count : count;
    }, 0);
    const selectedVehicleCount = selectedVehicles.reduce((count, current) => {
      return current ? ++count : count;
    }, 0);
    return selectedPlanetCount === 4 && selectedVehicleCount === 4;
  };

  return (
    <Paper className={root}>
      {planets.length && vehicles.length ? (
        <Grid container justify="center">
          <Grid item xs={12}>
            <h2 className={headerColor} align="center">
              Select planets you wish to search in:
            </h2>
          </Grid>
          {destinationsList.map((destination, index) => (
            <Grid
              key={index}
              item
              xs={12}
              md={6}
              lg={2}
              style={{ margin: "15px" }}
            >
              <h3 className={headerColor} align="center">
                {destination}
              </h3>
              <PlanetVehicleSelection
                planets={planets}
                selectedPlanets={selectedPlanets}
                vehicles={vehicles}
                selectedVehicles={selectedVehicles}
                handlePlanetChange={handlePlanetChange}
                handleVehicleChange={handleVehicleChange}
                planetIndex={index}
                getTimeTaken={getTimeTaken}
              />
            </Grid>
          ))}
          <Grid item xs={12} md={6} lg={2} style={{ marginTop: "55px" }}>
            <h2 className={headerColor} align="center">
              Time taken : {totalSearchTime || 0}
            </h2>
          </Grid>
          <Grid item xs={6} className={actions}>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmitData}
              disabled={!isAllSelected()}
            >
              Find Falcone!
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={onReset}
              className={reset}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid container justify="center">
          <Grid item style={{ marginTop: "15px" }}>
            {errorText ? (
              <h2 className={headerColor} align="center">
                Please check your network and try again.
              </h2>
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

MissionControl.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  totalSearchTime: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  fetchAuthToken: PropTypes.func.isRequired,
  fetchPlanets: PropTypes.func.isRequired,
  fetchVehicles: PropTypes.func.isRequired,
  incrementVehicleCount: PropTypes.func.isRequired,
  decrementVehicleCount: PropTypes.func.isRequired,
  updateTotalSearchTime: PropTypes.func.isRequired,
  findFalcone: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  planets: state.mainReducer.planets,
  vehicles: state.mainReducer.vehicles,
  totalSearchTime: state.timeReducer.totalSearchTime,
  token: state.authReducer.token,
  errorText: state.errorReducer.errorText
});

export default connect(mapStateToProps, {
  fetchAuthToken,
  fetchPlanets,
  fetchVehicles,
  incrementVehicleCount,
  decrementVehicleCount,
  updateTotalSearchTime,
  findFalcone
})(compose(withStyles(styles), withRouter)(MissionControl));
