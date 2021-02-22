import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";

import {
  withStyles,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel
} from "@material-ui/core";

function StyledRadio(props) {
  return <Radio disableRipple color="default" {...props} />;
}

const styles = () => ({
  root: {
    marginTop: "20px",
    marginLeft: "4px"
  }
});

const VehicleSelection = ({
  vehicles,
  onVehicleSelect,
  isInRange,
  classes
}) => {
  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormLabel component="legend" hidden>
        Vehicles Group
      </FormLabel>
      <RadioGroup
        defaultValue=""
        aria-label="vehicles group"
        name="customized-radios"
      >
        {vehicles.map((vehicle, index) => (
          <FormControlLabel
            key={index}
            value={vehicle.name}
            control={<StyledRadio />}
            label={`${vehicle.name} (${vehicle.total_no})`}
            onChange={onVehicleSelect}
            disabled={
              vehicle.total_no === 0 || !isInRange(vehicle.max_distance)
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

VehicleSelection.propTypes = {
  vehicles: PropTypes.array.isRequired,
  onVehicleSelect: PropTypes.func.isRequired
};

export default compose(withStyles(styles))(VehicleSelection);
