import React from "react";
const splashImage = require("../../images/intro-image-01.jpg");

const Splash = () => (
  <div id="intro" className="intro intro-01 intro-fullscreen clearfix">
    <div className="intro-image parallax">
      <img className="hidden" src={splashImage} alt="Splash screen" />
    </div>

    <div class="text-slider" data-delay="5">
      <div class="text-slide visible">
        <h2 class="text-fx">Custom Design</h2>
        <h6 class="text-fx-word">
          browse our selection of high detailed customized vehicles
        </h6>
      </div>
      <div class="text-slide">
        <h2 class="text-fx">Music Player</h2>
        <h6 class="text-fx-word">
          is the industry standard music player for a fully responsive design
          that scales automatically to suit any device
        </h6>
      </div>
    </div>
    <span className="scroll-discover">
      <span className="icon icon-line-arrow-left"></span> Scroll to discover
    </span>
  </div>
);

export default Splash;
