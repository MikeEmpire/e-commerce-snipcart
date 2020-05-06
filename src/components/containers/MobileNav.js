import React, { Fragment } from "react";

const MobileNav = () => (
  <Fragment>
    <div className="responsive-block">
      <div className="responsive-block-content">
        <a href="#intro" className="responsive-block-close"></a>
        <nav id="responsive-nav"></nav>
        <div id="responsive-social"> </div>
      </div>
    </div>
    <div className="responsive-block-layer"></div>
  </Fragment>
);

export default MobileNav;
