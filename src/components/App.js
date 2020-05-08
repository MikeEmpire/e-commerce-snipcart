import React from "react";

import Navbar from "./containers/Navbar";
import MobileNav from "./containers/MobileNav";
import Music from "./containers/Music";
import Contact from "./containers/Contact";
import Newsletter from "./containers/Newsletter";

import Splash from "./presentation/Splash";
import Bio from "./presentation/Bio";
import Footer from "./presentation/Footer";

const App = () => {
  console.log(process.env);
  return (
    <div>
      <div
        id="snipcart"
        data-api-key={`${process.env.REACT_APP_API_KEY}`}
      ></div>
      <MobileNav />
      <Navbar />
      <div className="site">
        <Splash />
        <Music />
        <Bio />
        <Contact />
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default App;
