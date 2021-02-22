import React, { useMemo } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const PlanetSelection = ({
  planets = [],
  selectedPlanets = [],
  onPlanetSelect,
  selectedPlanet = ""
}) => {
  const planetList = useMemo(() => {
    const filteredPlanets = planets.filter(
      (planet) => selectedPlanets.indexOf(planet.name) < 0
    );
    return filteredPlanets.length ? filteredPlanets : planets;
  }, [planets, selectedPlanets]);

  return (
    <Select
      options={
        planetList &&
        planetList.map((planet) => ({
          value: planet.name,
          label: planet.name
        }))
      }
      value={{
        value: selectedPlanet,
        label: selectedPlanet || "Select..."
      }}
      defaultValue=""
      onChange={onPlanetSelect}
    />
  );
};

PlanetSelection.propTypes = {
  planets: PropTypes.array.isRequired,
  selectedPlanets: PropTypes.array.isRequired,
  onPlanetSelect: PropTypes.func.isRequired
};

export default PlanetSelection;
