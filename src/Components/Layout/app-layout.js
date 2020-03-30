import React, { Component } from "react";
import Auxilary from "../../hoc/Auxilary";
import cssClasses from "./app-layout.module.css";
import Toolbar from "../../Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Navigation/SideDrawer/SideDrawer";

class AppLayout extends Component {
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
        <Toolbar openSlideHandler={this.openSlideHandler} />
        <SideDrawer
          show={this.state.showBackDrop}
          clicked={this.backDropClickhandler}
        ></SideDrawer>
        <main className={cssClasses.Content}>{this.props.children}</main>
      </Auxilary>
    );
  }
}

export default AppLayout;
