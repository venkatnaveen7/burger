import React, { useState, useEffect } from "react";
import AppLayout from "./hoc/Layout/app-layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import CheckOut from "./Containers/Checkout/Checkout";
import { Route, Switch, withRouter } from "react-router-dom";
import Orders from "./Containers/Orders/Orders";
import Authenticate from "./Containers/Auth/Auth";
import LogOut from "./Containers/LogOut/LogOut";
function App(props) {
  //const [show, setShow] = useState(false);

  useEffect(() => {
    //written this to test error comp unmout code to deregister axios interceptors
    //setShow(true);
    //setTimeout(() => setShow(false), 5000);
    console.log("App", props);
  });

  //return <AppLayout>{show ? <BurgerBuilder></BurgerBuilder> : null}</AppLayout>;'
  return (
    <div>
      <AppLayout>
        <Switch>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/checkout" component={CheckOut}></Route>
          <Route path="/logout" exact component={LogOut}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Route path="/auth" exact component={Authenticate}></Route>
        </Switch>
      </AppLayout>
    </div>
  );
}

export default App;
