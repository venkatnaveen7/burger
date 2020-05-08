import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class LogOut extends Component {
  componentDidMount() {
    this.props.logOut();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapPropsToDispatch = dispatch => {
  return {
    logOut: () => dispatch(actions.logOut())
  };
};

export default connect(
  null,
  mapPropsToDispatch
)(LogOut);
