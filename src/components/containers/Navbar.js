import React from "react";

const Navbar = () => (
  <div id="header" className="hide-navigation">
    <div id="search-block">
      <input
        type="text"
        placeholder="Search and hit enter..."
        name="s"
        id="search"
      />
    </div>

    <div id="social-block">
      <h6 className="social-title trans-10 show-fx">Follow Me</h6>

      <div className="social-icons trans-10 show-fx delay-01">
        <a className="circle-btn">
          <svg
            className="circle-svg"
            width="50"
            height="50"
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
          <span className="icon icon-facebook"></span>
        </a>

        <a className="circle-btn">
          <svg
            className="circle-svg"
            width="50"
            height="50"
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
          <span className="icon icon-twitter"></span>
        </a>

        <a className="circle-btn">
          <svg
            className="circle-svg"
            width="50"
            height="50"
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
          <span className="icon icon-Beatport"></span>
        </a>

        <a className="circle-btn">
          <svg
            className="circle-svg"
            width="50"
            height="50"
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
          <span className="icon icon-bandcamp"></span>
        </a>
      </div>
    </div>

    <div id="main-nav">
      <div className="nav-container">
        <a href="#intro" id="logo" className="smooth-scroll skew-fx">
          <img src="images/logo-light.svg" alt="Logo" className="logo-light" />
          <img src="images/logo.svg" alt="Logo" className="logo-dark" />
        </a>

        <nav id="icon-nav">
          <ul>
            <li className="responsive-trigger-wrap">
              <a className="circle-btn responsive-trigger">
                <svg
                  className="circle-svg"
                  width="40"
                  height="40"
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
                <span className="icon"></span>
              </a>
            </li>
            <li className="cart-trigger-wrap">
              <a href="#show-cart" className="cart-btn circle-btn">
                <svg
                  className="circle-svg"
                  width="40"
                  height="40"
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
                  <circle
                    className="circle-bg"
                    cx="25"
                    cy="25"
                    r="23"
                    stroke="#fff"
                    strokeWidth="1"
                    fill="none"
                  ></circle>
                </svg>
                <span className="pe-7s-cart"></span>
              </a>
            </li>
            <li className="search-trigger-wrap">
              <a id="nav-search" className="circle-btn">
                <svg
                  className="circle-svg"
                  width="40"
                  height="40"
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
                <span className="pe-7s-search"></span>
              </a>
            </li>
            <li className="social-trigger-wrap">
              <a id="nav-social" className="circle-btn">
                <svg
                  className="circle-svg"
                  width="40"
                  height="40"
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
                <span className="pe-7s-share"></span>
              </a>
            </li>
          </ul>
        </nav>

        <nav id="nav">
          <ul>
            <li className="text-fx-btn rotate-x-360">
              <a href="#music" className="trans-10 text-fx-btn-x">
                Music
              </a>
            </li>
            <li className="text-fx-btn rotate-x-360">
              <a href="#events" className="trans-10 text-fx-btn-x">
                Events
              </a>
            </li>
            <li className="text-fx-btn rotate-x-360">
              <a href="#bio" className="trans-10 text-fx-btn-x">
                Bio
              </a>
            </li>
            <li className="text-fx-btn rotate-x-360">
              <a href="#contact" className="trans-10 text-fx-btn-x">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
);

export default Navbar;
