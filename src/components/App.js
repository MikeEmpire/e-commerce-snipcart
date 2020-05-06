import React from "react";

import Navbar from "./containers/Navbar";
import MobileNav from './containers/MobileNav';

import Splash from './presentation/Splash';

const App = () => (
  <div className="App">
    <MobileNav />
    <Navbar />
    <div className="site">
      <Splash />
    </div>
  </div>
);

export default App;
