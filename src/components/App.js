import React from "react";

import Navbar from "./containers/Navbar";
import MobileNav from "./containers/MobileNav";

import Splash from "./presentation/Splash";

const App = (props) => {
  return (
    <div>
      <div hidden id="snipcart" data-api-key={`${process.env.REACT_APP_API_KEY}`}></div>
      <MobileNav />
      <Navbar />
      <div className="site">
        <Splash />
      </div>
    </div>
  );
};

export default App;
