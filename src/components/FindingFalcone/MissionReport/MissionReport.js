import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, Paper, withStyles } from "@material-ui/core";
import styles from "./MissionReport.styles";

const MissionReport = ({
  classes: { root, headerColor },
  totalSearchTime,
  planetFound,
  searchStatus,
  token,
  history
}) => {
  return (
    <>
      {token !== "" ? (
        <Paper className={root}>
          {searchStatus === "success" ? (
            <Grid container justify="center">
              <Grid item xs={12}>
                <h2 className={headerColor} align="center">
                  Success! Congratulations on Finding Falcone. King Shan is
                  mighty pleased!
                </h2>
              </Grid>
              <Grid item xs={12}>
                <h3 className={headerColor} align="center">
                  Time Taken: {totalSearchTime}
                </h3>
              </Grid>
              <Grid item xs={12}>
                <h3 className={headerColor} align="center">
                  Planet found: {planetFound}
                </h3>
              </Grid>
            </Grid>
          ) : (
            <Grid container justify="center">
              <Grid item xs={12}>
                <h2 className={headerColor} align="center">
                  Failure! Unable to locate Falcone!
                </h2>
              </Grid>
            </Grid>
          )}
          <Grid container justify="center">
            <Grid item xs={12}>
              <h2 className={headerColor} align="center">
                <Link to="/">Start Again</Link>
              </h2>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        history.push("/")
      )}
    </>
  );
};

MissionReport.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  totalSearchTime: PropTypes.number.isRequired,
  planetFound: PropTypes.string,
  searchStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  totalSearchTime: state.timeReducer.totalSearchTime,
  planetFound: state.mainReducer.missionResult.planet_name,
  searchStatus: state.mainReducer.missionResult.status
});

export default connect(mapStateToProps)(
  compose(withStyles(styles), withRouter)(MissionReport)
);
