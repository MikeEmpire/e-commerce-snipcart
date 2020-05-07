import React from "react";

import Navbar from "./containers/Navbar";
import MobileNav from "./containers/MobileNav";
import Music from './containers/Music';
import Contact from './containers/Contact';

import Splash from "./presentation/Splash";
import Bio from './presentation/Bio';

const App = () => {
  return (
    <div>
      <div id="snipcart" data-api-key={`${process.env.REACT_APP_API_KEY}`}></div>
      <MobileNav />
      <Navbar />
      <div className="site">
        <Splash />
        <Music />
        <Bio />
        <Contact />
      </div>
    </div>
  );
};

export default App;
