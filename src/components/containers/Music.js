import React from "react";

import products from "../../products";

const Music = () => {
  const renderProducts = products.map((p) => (
    <div className="item" data-categories="new glitch">
      <a
        className="thumb project-thumb thumb-fade ajax-link"
        data-nav-container="#music-items"
      >
        <img src="images/release01.jpg" alt="Release image" />
        <span className="badge new">NEW</span>
        <div className="desc-layer">
          <h2 className="text-fx-word">{p.name}</h2>
          <h3 className="text-fx-word">Meloo</h3>
        </div>
        <span className="thumb-icon trans-40">
          <svg
            className="circle-svg"
            width="80"
            height="80"
            viewBox="0 0 50 50"
          >
            <circle
              className="circle"
              cx="25"
              cy="25"
              r="23"
              stroke="#fff"
              stroke-width="1"
              fill="none"
            ></circle>
          </svg>
        </span>
      </a>
      <button
        className="buy-button snipcart-add-item"
        data-item-id={p.id}
        data-item-price={p.price}
        data-item-url={p.url}
        data-item-name={p.name}
        style={{ marginLeft: "19%" }}
      >
        Add to cart {p.price}
      </button>{" "}
    </div>
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
            <a data-categories="*" className="reveal-fx-static">
              All
            </a>
          </li>
          <li>
            <a data-categories="new" className="reveal-fx-static">
              New Tracks
            </a>
          </li>
          <li>
            <a data-categories="drum-and-bass" className="reveal-fx-static">
              Drum and Bass
            </a>
          </li>
          <li>
            <a data-categories="glitch" className="reveal-fx-static">
              Glitch Hop
            </a>
          </li>
          <li>
            <a data-categories="breakbeat" className="reveal-fx-static">
              Breakbeat
            </a>
          </li>
          <li>
            <a data-categories="uk-funky" className="reveal-fx-static">
              UK Funky
            </a>
          </li>
          <li>
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
