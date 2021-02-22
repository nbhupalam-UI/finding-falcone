import React, { useCallback, useEffect, useMemo, useState } from "react";

import PlanetSelection from "../PlanetVehicleSelection/PlanetSelection/PlanetSelection";
import VehicleSelection from "../PlanetVehicleSelection/VehicleSelection/VehicleSelection";

const PlanetVehicleSelection = ({
  planets,
  vehicles,
  selectedPlanets,
  selectedVehicles,
  handlePlanetChange,
  planetIndex,
  handleVehicleChange
}) => {
  const [selectedPlanet, setSelectedPlanet] = useState("");

  useEffect(() => {
    if (selectedPlanets.length === 0) {
      setSelectedPlanet("");
    }
  }, [selectedPlanets]);

  const onPlanetSelect = ({ value }) => {
    setSelectedPlanet(value);
    handlePlanetChange(value, planetIndex);
  };
  const onVehicleSelect = ({ target: { value: name } }) => {
    handleVehicleChange(name, planetIndex);
  };

  const availablePlanets = useMemo(() => {
    return planets.filter((planet) => {
      return selectedPlanets.indexOf(planet.name) === -1;
    });
  }, [planets, selectedPlanets]);

  const availableVehicles = useMemo(() => {
    let availableVehiclesList = JSON.parse(JSON.stringify(vehicles));
    const vehicleObj = {};
    selectedVehicles.forEach((vehicle) => {
      vehicleObj[vehicle] = vehicleObj[vehicle] ? vehicleObj[vehicle] + 1 : 1;
    });
    availableVehiclesList.forEach((vehicle) => {
      if (selectedVehicles.indexOf(vehicle.name) > -1) {
        vehicle.total_no -= vehicleObj[vehicle.name];
      }
    });
    return availableVehiclesList;
  }, [vehicles, selectedVehicles]);

  const isInRange = useCallback(
    (vehicleMaxDistance) => {
      if (selectedPlanets.length) {
        const planet = selectedPlanets[planetIndex];
        const { distance } = planets.filter(({ name }) => name === planet)[0];
        return distance <= vehicleMaxDistance;
      }
    },
    [selectedPlanets, planets, planetIndex]
  );

  return (
    <div>
      <PlanetSelection
        planets={availablePlanets}
        selectedPlanets={selectedPlanets}
        onPlanetSelect={onPlanetSelect}
        selectedPlanet={selectedPlanet}
      />
      {selectedPlanet && (
        <VehicleSelection
          vehicles={availableVehicles}
          onVehicleSelect={onVehicleSelect}
          selectedPlanet={selectedPlanet}
          isInRange={isInRange}
        />
      )}
    </div>
  );
};

export default PlanetVehicleSelection;
