import React from "react";
import AppLayout from "./Components/Layout/app-layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";

function App() {
  return (
    <AppLayout>
      <BurgerBuilder></BurgerBuilder>
    </AppLayout>
  );
}

export default App;
