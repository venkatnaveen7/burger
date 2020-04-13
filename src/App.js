import React, { useState, useEffect } from "react";
import AppLayout from "./hoc/Layout/app-layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import CheckOut from "./Containers/Checkout/Checkout";
import { Route, Switch, withRouter } from "react-router-dom";
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
          <Route path="/checkout" component={CheckOut}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
        </Switch>
      </AppLayout>
    </div>
  );
}

export default App;
