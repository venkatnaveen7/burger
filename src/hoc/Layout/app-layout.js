import React, { Component } from "react";
import Auxilary from "../Auxilary/Auxilary";
import cssClasses from "./app-layout.module.css";
import Toolbar from "../../Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class AppLayout extends Component {
  componentDidMount() {}

  state = {
    showBackDrop: false
  };

  backDropClickhandler = () => {
    this.setState({
      showBackDrop: false
    });
  };

  openSlideHandler = () => {
    this.setState(oldState => {
      return { showBackDrop: !oldState.showBackDrop };
    });
  };

  render() {
    return (
      <Auxilary>
        {/* <div>Toolbar,Slidebar,Backdrop</div> */}
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          openSlideHandler={this.openSlideHandler}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          show={this.state.showBackDrop}
          clicked={this.backDropClickhandler}
        ></SideDrawer>
        <main className={cssClasses.Content}>{this.props.children}</main>
      </Auxilary>
    );
  }
}

const mapPropsToState = state => {
  return {
    isAuthenticated: state.auth.token != null
  };
};

export default connect(mapPropsToState)(AppLayout);
