import React from "react";

const Bio = () => (
  <div>
    <div id="bio" className="section">
      <div className="container small section-content bio-text-block">
        <header className="content-header">
          <h2 className="content-title">Biography</h2>
          <span className="back-layer barlow" data-parallax='{"y": -40}'>
            Biography
          </span>
        </header>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          porttitor fermentum ullamcorper. Aliquam erat volutpat. Nullam purus
          metus, interdum ac lacinia non, sodales non arcu. In eleifend
          vestibulum eleifend. Maecenas ut felis mi, vitae pharetra justo. Ut
          lacus lacus, fermentum sed tincidunt eget, suscipit nec orci. Sed
          pellentesque dapibus tellus in semper. Aenean faucibus aliquet turpis,
          id fermentum sem consectetur id. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Duis faucibus euismod nunc scelerisque tincidunt.
        </p>

        <blockquote>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          porttitor fermentum ullamcorper. Aliquam erat volutpat. Nullam purus
          metus, interdum ac lacinia non.
        </blockquote>

        <p>
          Phasellus ligula sem, laoreet luctus luctus sed, pharetra in mi.
          Aenean accumsan gravida convallis. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus congue
          tellus lectus, quis sodales sem. Ut nec nisl id sem ultricies
          malesuada. Nunc eu justo mauris, non lobortis dolor. Nunc id
          condimentum leo. Vestibulum tortor eros, mollis ac tempor et, commodo
          eu tellus. Curabitur a leo non nunc tristique tincidunt. Donec enim
          eros, blandit pharetra dapibus ullamcorper, aliquet sit amet diam.
          Aenean tempus laoreet adipiscing. Vivamus eleifend pretium
          pellentesque.
        </p>
      </div>

      <div className="container full-width bio-bg-block">
        {/* eslint-disable-next-line */}
        <a href="#" className="click-layer thumb">
          <span className="thumb-icon trans-40 on">
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
                strokeWidth="1"
                fill="none"
              ></circle>
            </svg>
            <span className="pe-7s-play"></span>
          </span>
        </a>
        <img
          data-parallax='{"y": -50}'
          src="images/bio-image.png"
          alt="Bio"
        />
      </div>
    </div>

    <div
      className="container full-width section-content stats-bg-block"
      style={{ zIndex: 0 }}
    >
      <div className="grid-row grid-row-pad">
        <div className="grid-6 grid-tablet-12 grid-mobile-12">
          <h3 className="heading-1 text-center">Testimonials</h3>

          <div className="slider-block testi-slider-block slider-nav-simple">
            <ul className="testi-slider trans-20">
              <li className="on">
                <div className="back-layer" data-parallax='{"y": -30}'>
                  <img
                    src="images/testimonial-image-01.jpg"
                    alt="slide"
                    className="trans-25"
                  />
                </div>
                <div className="front-layer" data-parallax='{"y": -20}'>
                  <div className="text">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ut eu felis tellus, sit amet elementum est. Proin posuere
                      turpis lectus, eget vulputate erat. Nunc eget metus in
                      magna vulputate elementum sed ut leo. Mauris at mauris
                      purus, ut laoreet eros.
                      <span className="name">DJ Johny Drama</span>
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="back-layer" data-parallax='{"y": -30}'>
                  <img
                    src="images/testimonial-image-02.jpg"
                    alt="slide"
                    className="trans-25"
                  />
                </div>
                <div className="front-layer" data-parallax='{"y": -20}'>
                  <div className="text trans-25">
                    <p>
                      Phasellus ligula sem, laoreet luctus luctus sed, pharetra
                      in mi. Aenean accumsan gravida convallis. Vestibulum ante
                      ipsum primis in faucibus orci luctus et ultrices posuere
                      cubilia Curae; Vivamus congue tellus lectus, quis sodales
                      sem.<span className="name">Fancy Crew</span>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid-6 grid-tablet-12 grid-mobile-12">
          <h3 className="heading-1 text-center">My world in numbers</h3>
          <ul className="stats" data-timer="10000" data-parallax='{"y": 30}'>
            <li>
              <span className="stat-value">1876</span>
              <span className="stat-name">gigs</span>
            </li>
            <li>
              <span className="stat-value">1200</span>
              <span className="stat-name">happy peoples</span>
            </li>
            <li>
              <span className="stat-value">1266</span>
              <span className="stat-name">releases</span>
            </li>
            <li>
              <span className="stat-value">2356</span>
              <span className="stat-name">coffees per year</span>
            </li>
            <li>
              <span className="stat-value">1076</span>
              <span className="stat-name">red buls per year</span>
            </li>
            <li>
              <span className="stat-value">2009</span>
              <span className="stat-name">year of creation</span>
            </li>
            <li>
              <span className="stat-value">1887</span>
              <span className="stat-name">Glitch tracks</span>
            </li>
            <li>
              <span className="stat-value">3238</span>
              <span className="stat-name">vinyls</span>
            </li>
            <li>
              <span className="stat-value">2432</span>
              <span className="stat-name">dubstep tracks</span>
            </li>
            <li>
              <span className="stat-value">1432</span>
              <span className="stat-name">UK funky tracks</span>
            </li>
            <li>
              <span className="stat-value">1234</span>
              <span className="stat-name">Dub tracks</span>
            </li>
            <li>
              <span className="stat-value">1238</span>
              <span className="stat-name">countries</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default Bio;
