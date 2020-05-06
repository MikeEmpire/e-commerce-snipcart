import React from "react";

import Navbar from "./containers/Navbar";
import MobileNav from './containers/MobileNav'

const App = () => (
  <div className="App">
    <MobileNav />
    <Navbar />
  </div>
);

export default App;
