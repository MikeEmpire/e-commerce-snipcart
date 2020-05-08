import React from "react";

import Product from "../presentation/Product";

import products from "../../products";

const Music = () => {
  const renderProducts = products.map((p) => (
    <Product key={p.id} product={p} />
  ));

  return (
    <div id="music" className="section">
      <div className="container music-header section-content full-width">
        <header className="content-header">
          <h2 className="content-title">Music</h2>
          <span className="back-layer barlow" data-parallax='{"y": 20}'>
            Releases
          </span>
        </header>
      </div>

      <div id="music-main-filter" className="filter">
        <ul className="filter-list item-filter active-filter clearfix">
          <li>
            {/* eslint-disable-next-line */}
            <a data-categories="*" className="reveal-fx-static">
              All
            </a>
          </li>
          <li>
            {/* eslint-disable-next-line */}
            <a data-categories="new" className="reveal-fx-static">
              New Tracks
            </a>
          </li>
          <li>
            {/* eslint-disable-next-line */}
            <a data-categories="drum-and-bass" className="reveal-fx-static">
              Drum and Bass
            </a>
          </li>
          <li>
            {/* eslint-disable-next-line */}
            <a data-categories="glitch" className="reveal-fx-static">
              Glitch Hop
            </a>
          </li>
          <li>
            {/* eslint-disable-next-line */}
            <a data-categories="breakbeat" className="reveal-fx-static">
              Breakbeat
            </a>
          </li>
          <li>
            {/* eslint-disable-next-line */}
            <a data-categories="uk-funky" className="reveal-fx-static">
              UK Funky
            </a>
          </li>
          <li>
            {/* eslint-disable-next-line */}
            <a data-categories="dubstep" className="reveal-fx-static">
              Dubstep
            </a>
          </li>
        </ul>
      </div>
      <div id="music-items" className="full-width items clearfix">
        {renderProducts}
      </div>
    </div>
  );
};

export default Music;
