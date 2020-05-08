import AppLayout from "./hoc/Layout/app-layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import CheckOut from "./Containers/Checkout/Checkout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Orders from "./Containers/Orders/Orders";
import Authenticate from "./Containers/Auth/Auth";
import LogOut from "./Containers/LogOut/LogOut";
import { connect } from "react-redux";
import React, { Component } from "react";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.tryAutoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Route path="/auth" exact component={Authenticate}></Route>
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/checkout" component={CheckOut}></Route>
          <Route path="/logout" exact component={LogOut}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Route path="/auth" exact component={Authenticate}></Route>
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <AppLayout>{routes}</AppLayout>
      </div>
    );
  }
}

/* function App(props) {
  //const [show, setShow] = useState(false);

  useEffect(() => {
    //written this to test error comp unmout code to deregister axios interceptors
    //setShow(true);
    //setTimeout(() => setShow(false), 5000);
    console.log("App", props);
  });

  //return <AppLayout>{show ? <BurgerBuilder></BurgerBuilder> : null}</AppLayout>;'
  return (
    
  );
} */
const mapPropsToState = state => {
  return {
    isAuthenticated: state.auth.token != null
  };
};
const mapPropsToDispatch = dispatch => {
  return {
    tryAutoLogin: () => dispatch(actions.tryAutoLogin())
  };
};

export default connect(
  mapPropsToState,
  mapPropsToDispatch
)(App);
