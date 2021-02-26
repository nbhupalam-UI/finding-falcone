import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  withStyles,
  Button
} from "@material-ui/core";

import styles from "./Header.styles";
import { GEEK_TRUST_HOME_URL } from "../../config/constants";

class Header extends Component {
  render() {
    const {
      classes: { link, textCenter, title, toolbar, appBar }
    } = this.props;
    return (
      <AppBar position="static" className={appBar}>
        <Toolbar className={toolbar}>
          <div>&nbsp;</div>
          <Typography variant="h4" className={[title, textCenter].join(" ")}>
            Finding Falcone!
          </Typography>
          <div>
            <Button variant="text">
              <a href={GEEK_TRUST_HOME_URL} className={link}>
                Geek Trust Home
              </a>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(withStyles(styles), withRouter)(Header);
