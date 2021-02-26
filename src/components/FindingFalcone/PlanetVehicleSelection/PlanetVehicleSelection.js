import React, { useEffect, useState } from "react";

import PlanetSelection from "../PlanetVehicleSelection/PlanetSelection/PlanetSelection";
import VehicleSelection from "../PlanetVehicleSelection/VehicleSelection/VehicleSelection";
import {
  getAvailableVehicles,
  getAvailablePlanets,
  isInRange
} from "../../../store/actions/fetchActions";

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
    if (!selectedPlanets.length) {
      setSelectedPlanet("");
    }
  }, [selectedPlanets]);

  const onPlanetSelect = ({ value }) => {
    setSelectedPlanet(value);
    handlePlanetChange(value, planetIndex);
  };

  return (
    <div>
      <PlanetSelection
        planets={getAvailablePlanets(planets, selectedPlanets)}
        selectedPlanets={selectedPlanets}
        onPlanetSelect={onPlanetSelect}
        selectedPlanet={selectedPlanet}
      />
      {selectedPlanet && (
        <VehicleSelection
          vehicles={getAvailableVehicles(vehicles, selectedVehicles)}
          onVehicleSelect={(e) =>
            handleVehicleChange(e.target.value, planetIndex)
          }
          selectedPlanet={selectedPlanet}
          isInRange={(vehicleMaxDistance) =>
            isInRange(selectedPlanets, planets, planetIndex, vehicleMaxDistance)
          }
        />
      )}
    </div>
  );
};

export default PlanetVehicleSelection;
