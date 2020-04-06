import React, { useState, useEffect } from "react";
import AppLayout from "./hoc/Layout/app-layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";

function App() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    //written this to test error comp unmout code to deregister axios interceptors
    setShow(true);
    //setTimeout(() => setShow(false), 5000);
  });

  return <AppLayout>{show ? <BurgerBuilder></BurgerBuilder> : null}</AppLayout>;
}

export default App;
