import React from "react";

const Music = () => (
  <div id="music" class="section">
    <div class="container music-header section-content full-width">
      <header class="content-header">
        <h2 class="content-title">Music</h2>
        <span class="back-layer barlow" data-parallax='{"y": 20}'>
          Releases
        </span>
      </header>
    </div>

    <div id="music-main-filter" class="filter">
      <ul class="filter-list item-filter active-filter clearfix">
        <li>
          <a data-categories="*" class="reveal-fx-static">
            All
          </a>
        </li>
        <li>
          <a data-categories="new" class="reveal-fx-static">
            New Tracks
          </a>
        </li>
        <li>
          <a data-categories="drum-and-bass" class="reveal-fx-static">
            Drum and Bass
          </a>
        </li>
        <li>
          <a data-categories="glitch" class="reveal-fx-static">
            Glitch Hop
          </a>
        </li>
        <li>
          <a data-categories="breakbeat" class="reveal-fx-static">
            Breakbeat
          </a>
        </li>
        <li>
          <a data-categories="uk-funky" class="reveal-fx-static">
            UK Funky
          </a>
        </li>
        <li>
          <a data-categories="dubstep" class="reveal-fx-static">
            Dubstep
          </a>
        </li>
      </ul>
    </div>
  </div>
);
